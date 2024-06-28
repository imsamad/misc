import express from 'express';
const app = express();

import https from 'httpolyglot';
import mediasoup from 'mediasoup';
import fs from 'fs';
import path from 'path';
import { Server } from 'socket.io';
app.use('/sfu', express.static(path.join(process.cwd(), 'public')));

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
    rtcMaxPort: 2020,
    rtcMinPort: 2000,
  });
  console.log(`Worker pid ${worker.pid}`);

  worker.on('died', (error) => {
    console.log('mediasoup worker died: ', worker.pid);
    setTimeout(() => process.exit(1), 2000);
  });

  return worker;
};

let worker = await createWorker();
let router;
let producerTransport, consumerTransport, producer, consumer;

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

const io = new Server(httpServer);
const peers = io.of('/mediasoup');

peers.on('connection', async (socket) => {
  socket.on('disconnect', () => {
    console.log('peer disconneted');
  });

  console.log(socket.id);

  socket.emit('connection-success', {
    socketId: socket.id,
    isProducerExist: producer ? true : false,
  });

  socket.on('createRoom', async (cb) => {
    router = router ? router : await worker.createRouter({ mediaCodecs });
    cb({ rtpCapabilities: router.rtpCapabilities });
  });

  socket.on('createWebRtcTransport', async ({ sender }, cb) => {
    console.log('createWebRtcTransport');
    if (sender) {
      producerTransport = await createWebRtcTransport(cb);
    } else consumerTransport = await createWebRtcTransport(cb);
  });

  socket.on('transport-connect', async ({ dtlsParameters }) => {
    await producerTransport.connect({ dtlsParameters });
  });

  socket.on(
    'transport-produce',
    async ({ transportId, kind, rtpParameters, appData }, cb) => {
      producer = await producerTransport.produce({ kind, rtpParameters });
      producer.on('transportclose', () => {
        console.log('transport for this producer closed');
        producer.close();
      });
      console.log('producerL ', producer.id);
      cb({
        id: producer.id,
      });
    }
  );

  socket.on('consume', async ({ rtpCapabilities }, cb) => {
    try {
      if (
        router.canConsume({
          producerId: producer.id,
          rtpCapabilities,
        })
      ) {
        consumer = await consumerTransport.consume({
          producerId: producer.id,
          rtpCapabilities,
          paused: true,
        });

        consumer.on('transportclose', () => {
          console.log('tpt close from consumer');
        });
        consumer.on('producerclose', () => {
          console.log('tpt close from producer');
        });
        // console.log('on consume consumer: ', consumer?.resume);
        const params = {
          id: consumer.id,
          producerId: producer.id,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
        };

        cb({ params });
      }
    } catch (error) {
      console.log('from consume : ', error);
      cb({ params: { error } });
    }
  });

  socket.on('transport-recv-connect', async ({ dtlsParameters }) => {
    await consumerTransport.connect({ dtlsParameters });
  });

  socket.on('consumer-resume', async () => {
    // console.log('consumer ', consumer?.resume);
    // console.log('consumerTransport ', consumerTransport);
    await consumer.resume();
  });
});

async function createWebRtcTransport(cb) {
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
    });

    tpt.on('close', () => {
      console.log('tpt closed!');
    });

    cb({
      params: {
        id: tpt.id,
        iceParameters: tpt.iceParameters,
        iceCandidates: tpt.iceCandidates,
        dtlsParameters: tpt.dtlsParameters,
      },
    });
    return tpt;
  } catch (error) {
    console.log('error from createWebRtcTransport: ', error);
    cb({
      params: error,
    });
  }
}
