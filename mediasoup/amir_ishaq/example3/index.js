import express from 'express';
const app = express();

import https from 'httpolyglot';
import mediasoup from 'mediasoup';
import fs from 'fs';
import path from 'path';
import { Server } from 'socket.io';

app.use('/sfu/:room', express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
  res.send('HEll');
});

const options = {
  key: fs.readFileSync('./server/ssl/key.pem', 'utf-8'),
  cert: fs.readFileSync('./server/ssl/cert.pem', 'utf-8'),
};

// openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
// openssl rsa -in keytemp.pem -out key.pem

const httpServer = https.createServer(options, app);

httpServer.listen(3000, () => {
  console.log(`Listening on port 3000`);
});

const createWorker = async () => {
  let worker = await mediasoup.createWorker({
    rtcMaxPort: 2025,
    rtcMinPort: 2000,
  });
  console.log(`Worker pid ${worker.pid}`);

  worker.on('died', (error) => {
    console.log('mediasoup worker died: ', worker.pid);
    setTimeout(() => process.exit(1), 2000);
  });

  return worker;
};

const mediaCodecs = [
  {
    kind: 'audio',
    mimeType: 'audio/opus',
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: 'video',
    mimeType: 'video/vp8',
    clockRate: 90000,
    // channels: 2,
    parameters: {
      'x-google-start-bitrate': 1000,
    },
  },
];

let worker = await createWorker();

let rooms = {}; // {roomName: { router, rooms:[socketIds] }}

let peers = {}; // { socketId: {roomName, socket, transports:[id1, id2, ...], producers:[id1, id2, ...]}}

let transports = []; // [ { socketId, roomName1, transport, consumer:boolean } ]

let producers = []; // [{ socketId, roomName, producer }]

let consumers = []; // [{ socketId, roomName, consumer }]

const io = new Server(httpServer);

const connections = io.of('/mediasoup');

connections.on('connection', async (socket) => {
  console.log('1: conencted socketed');

  socket.emit('connection-success', {
    socketId: socket.id,
  });

  socket.on('disconnect', () => {
    transports = removeItems(transports, socket.id, 'transport');

    producers = removeItems(producers, socket.id, 'producer');

    consumers = removeItems(consumers, socket.id, 'consumer');

    const roomName = peers[socket.id].roomName;

    delete peers[socket.id];

    rooms[roomName] = {
      router: rooms[roomName].router,
      peers: rooms[roomName].peers.filter((socketId) => socketId !== socket.id),
    };
  });

  function removeItems(items, socketId, key) {
    items.forEach((item) => {
      if (item.socketId == socketId) {
        console.log('first: ', key);
        item[key].close();
      }
    });

    return items.filter((item) => item.socketId !== socket.id);
  }

  socket.on('joinRoom', async ({ roomName }, cb) => {
    console.log('2: joinRoom');
    const router1 = await createRoom(roomName, socket.id);

    peers[socket.id] = {
      socket,
      roomName,
      transports: [],
      producers: [],
      consumers: [],
      peerDetails: {
        name: '',
        isAdmin: false,
      },
    };

    cb({ rtpCapabilities: router1.rtpCapabilities });
  });

  async function createRoom(roomName, socketId) {
    let router1;
    let peers = [];
    if (rooms[roomName]) {
      router1 = rooms[roomName].router;
      peers = rooms[roomName].peers || [];
    } else {
      router1 = await worker.createRouter({ mediaCodecs });
    }

    rooms[roomName] = {
      router: router1,
      peers: [...peers, socketId],
    };

    return router1;
  }

  socket.on('createWebRtcTransport', async ({ consumer }, cb) => {
    console.log('3: createWebRtcTransport');
    const roomName = peers[socket.id].roomName;
    const router = rooms[roomName].router;

    createWebRtcTransport(router)
      .then((transport) => {
        cb({
          params: {
            id: transport.id,
            iceParameters: transport.iceParameters,
            iceCandidates: transport.iceCandidates,
            dtlsParameters: transport.dtlsParameters,
          },
        });

        addTransport(transport, roomName, consumer);
      })
      .catch((error) => {
        console.log('error from createWebRtcTpt: ', error);
      });
  });

  function addTransport(transport, roomName, consumer) {
    transports.push({
      socketId: socket.id,
      transport,
      roomName,
      consumer,
      isConsumer: consumer,
    });

    peers[socket.id] = {
      ...peers[socket.id],
      transport: [...peers[socket.id].transports, transport.id],
    };
  }

  function addProducer(producer, roomName) {
    producers.push({
      socketId: socket.id,
      producer,
      roomName,
    });

    peers[socket.id] = {
      ...peers[socket.id],
      producers: [...peers[socket.id].producers, producer.id],
    };
  }

  function addConsumer(consumer, roomName) {
    consumers.push({
      socketId: socket.id,
      consumer,
      roomName,
    });
    peers[socket.id] = {
      ...peers[socket.id],
      consumers: [...peers[socket.id].consumers, consumer.id],
    };
  }

  socket.on('getProducers', (cb) => {
    cb(
      producers
        .filter(
          (p) =>
            p.roomName == peers[socket.id].roomName && p.socketId != socket.id
        )
        .map((p) => p.producer.id)
        .flat()
    );
  });

  function informConsumers(roomName, socketId, producerId) {
    producers.forEach((p) => {
      if (p.socketId !== socketId && p.roomName == roomName) {
        const producerSocket = peers[p.socketId].socket;
        producerSocket.emit('new-producer', { producerId });
      }
    });
  }

  socket.on('transport-connect', async ({ dtlsParameters }) => {
    console.log('4: transport-connect');
    try {
      console.log('try start');
      console.log('dtlsParameters: ', dtlsParameters);
      await getProducerTransport(socket.id).connect({ dtlsParameters });
    } catch (error) {
      console.log('eerror from transport connect: ', error);
    }
  });

  function getProducerTransport(socketId) {
    return transports.find(
      ({ socketId: s, consumer }) => s == socketId && !consumer
    ).transport;
  }

  socket.on('transport-produce', async ({ kind, rtpParameters }, cb) => {
    const producer = await getProducerTransport(socket.id).produce({
      kind,
      rtpParameters,
    });

    const { roomName } = peers[socket.id];

    addProducer(producer, roomName);
    informConsumers(roomName, socket.id, producer.id);
    producer.on('transportclose', () => {
      console.log('transport for this producer closed');
      producer.close();
    });

    cb({
      id: producer.id,
      producerExist: producers.length > 1,
    });
  });

  socket.on(
    'consume',
    async (
      { rtpCapabilities, remoteProducerId, serverConsumerTransportId },
      cb
    ) => {
      try {
        const roomName = peers[socket.id].roomName;
        const router = rooms[roomName].router;

        let consumerTransport = transports.find(
          (tpt) =>
            tpt.consumer && serverConsumerTransportId === tpt.transport.id
        ).transport;

        if (
          router.canConsume({
            producerId: remoteProducerId,
            rtpCapabilities,
          })
        ) {
          const consumer = await consumerTransport.consume({
            producerId: remoteProducerId,
            rtpCapabilities,
            paused: true,
          });

          consumer.on('transportclose', () => {
            console.log('transport closed for this consumer');
          });

          consumer.on('producerclose', () => {
            console.log('producer close of this corresponsing consumer');
            socket.emit('producer-closed', { remoteProducerId });
            consumerTransport.close();

            transports = transports.filter(
              (tpt) => consumerTransport.id !== tpt.transport.id
            );
            consumer.close();
            consumers = consumers.filter(
              (con) => con.consumer.id !== consumer.id
            );
          });

          addConsumer(consumer, roomName);

          const params = {
            id: consumer.id,
            producerId: remoteProducerId,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters,
            serverConsumerId: consumer.id,
          };

          cb({ params });
        }
      } catch (error) {
        cb({ params: { error } });
      }
    }
  );

  socket.on(
    'transport-recv-connect',
    async ({ serverConsumerTransportId, dtlsParameters }) => {
      console.log('serverConsumerTransportId: ', serverConsumerTransportId);
      await transports
        .find((t) => t.consumer && t.transport.id === serverConsumerTransportId)
        .transport.connect({ dtlsParameters });
    }
  );

  socket.on('consumer-resume', async ({ serverConsumerId }) => {
    console.log('consumers: ', consumers);
    console.log('socketId: ', socket.id);

    await consumers
      .find((c) => c.consumer.id == serverConsumerId)
      .consumer.resume();
  });
});

async function createWebRtcTransport(router) {
  return new Promise(async (resolve, reject) => {
    try {
      const webRtcTptOptions = {
        listenIps: [
          {
            ip: '127.0.0.1',
          },
        ],
        enableTcp: true,
        enableUdp: true,
        preferUdp: true,
      };
      let tpt = await router.createWebRtcTransport(webRtcTptOptions);

      tpt.on('dtlsstatechange', (dtlsState) => {
        if (dtlsState == 'closed') tpt.close();
        console.log('dtlsstatechange: ', dtlsState);
      });

      tpt.on('close', () => {
        console.log('tpt closed');
      });
      console.log('resolved');
      resolve(tpt);
    } catch (error) {
      console.log('error from createWebRtcTpt');
      reject(error);
    }
  });
}
