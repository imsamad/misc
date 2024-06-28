const io = require('socket.io-client');
const mediasoupClient = require('mediasoup-client');

const roomName = window.location.pathname.split('/')[2];
const localVideo = document.getElementById('localVideo');
const videoContainer = document.getElementById('videoContainer');

let params = {
  encoding: [
    {
      rid: 'r0',
      maxBitrate: 100000,
      scalabilityMode: 'S1T3',
    },
    {
      rid: 'r1',
      maxBitrate: 300000,
      scalabilityMode: 'S1T3',
    },
    {
      rid: 'r2',
      maxBitrate: 900000,
      scalabilityMode: 'S1T3',
    },
  ],
  codecOptions: {
    videoGoogleStartBitrate: 1000,
  },
};

let device;

let consumerTransports = [];
let audioProducer;
let videoProducer;

const socket = io('/mediasoup');

socket.on('connection-success', ({ socketId }) => {
  console.log('1: socket connection established: ', socketId);
  getLocalStreanm();
});

function getLocalStreanm() {
  console.log('2: getLocalStream');
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: {
        width: 640,
        max: 1920,
      },
      height: {
        min: 400,
        max: 1080,
      },
    })
    .then(streamSuccess)
    .catch((error) => {
      console.log('error from navigator.getUserMedia: ', error.message);
    });
}

let audioParams = {};
let videoParams = { params };
let consumingTransports = [];

async function streamSuccess(stream) {
  console.log('3: streamSuccess');
  localVideo.srcObject = stream;

  audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
  videoParams = { track: stream.getVideoTracks()[0], ...videoParams };

  joinRoom();
}

function joinRoom() {
  console.log('4: joinRoom');
  socket.emit('joinRoom', { roomName }, (data) => {
    console.log('5: joinRoom event cb: ', data);
    createDevice(data.rtpCapabilities);
  });
}

async function createDevice(routerRtpCapabilities) {
  try {
    console.log('6: createdDevice');
    device = new mediasoupClient.Device();

    await device.load({ routerRtpCapabilities });

    createSendTransport();
  } catch (error) {
    console.log('error from createDevice: ', error);
    if (error.name == 'UnsupportedError')
      console.warn('browser does not support');
  }
}

async function createSendTransport() {
  console.log('7: createSendTransport');
  socket.emit(
    'createWebRtcTransport',
    { consumer: false },
    ({ params: cbParams }) => {
      console.log('8: createSendTransport event cb');
      if (cbParams.error) {
        return;
      }

      const producerTransport = device.createSendTransport(cbParams);

      producerTransport.on('connect', async (props, cb, errCb) => {
        console.log('10: producerTransport on connect: ', props);
        try {
          await socket.emit('transport-connect', {
            dtlsParameters: props.dtlsParameters,
          });
          cb();
        } catch (error) {
          errCb(error);
        }
      });

      producerTransport.on('produce', async (props, cb, errCb) => {
        console.log('11: producerTransport on produce: ', props);
        try {
          await socket.emit(
            'transport-produce',
            {
              kind: props.kind,
              rtpParameters: props.rtpParameters,
              appData: props.appData,
            },
            ({ id, producerExist }) => {
              console.log(
                `12: on tarnsport-produce event cb: `,
                id,
                ' , producerExist = ',
                producerExist
              );
              cb({ id });
              if (producerExist) {
                getProducers();
              }
            }
          );
        } catch (error) {
          errCb(error);
        }
      });
      connectSendTransport(producerTransport);
    }
  );
}

async function connectSendTransport(producerTransport) {
  try {
    console.log('9: connectSendTransport');
    audioProducer = await producerTransport.produce(audioParams);
    videoProducer = await producerTransport.produce(videoParams);
    audioProducer.on('trackended', () => {
      console.log('audioProducer tractended');
    });
    audioProducer.on('transportclose', () => {
      console.log('audioProducer transportclose');
    });
    videoProducer.on('trackended', () => {
      console.log('videoProducer tractended');
    });
    videoProducer.on('transportclose', () => {
      console.log('videoProducer transportclose');
    });
  } catch (error) {
    console.log('error connectSendTransport: ', error);
  }
}

socket.on('new-producer', ({ producerId }) =>
  singleNewConsumerTransport(producerId)
);

socket.on('producer-closed', ({ remoteProducerId }) => {
  const producerToClose = consumerTransports.find(
    ({ producerId }) => producerId == remoteProducerId
  );

  producerToClose.consumerTransport.close();
  producerToClose.consumer.close();
  consumerTransports = consumerTransports.filter(
    ({ producerId }) => producerId !== remoteProducerId
  );

  videoContainer.removeChild(document.getElementById(`id-${remoteProducerId}`));
});

function getProducers() {
  socket.emit('getProducers', (producerIds) => {
    console.log('producerIds: ', producerIds);
    producerIds.forEach(singleNewConsumerTransport);
  });
}

async function singleNewConsumerTransport(remoteProducerId) {
  //check if we are already consuming the remoteProducerId
  if (consumingTransports.includes(remoteProducerId)) return;

  consumingTransports.push(remoteProducerId);

  socket.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
    if (params.error) {
      return;
    }
    console.log('createWebRtcTransport consumer: ');
    const consumerTransport = device.createRecvTransport(params);
    consumerTransport.on('connect', async ({ dtlsParameters }, cb, errCb) => {
      try {
        await socket.emit('transport-recv-connect', {
          dtlsParameters,
          serverConsumerTransportId: params.id,
        });
        cb();
      } catch (error) {
        errCb(error);
      }
    });

    const serverConsumerTransportId = params.id;

    connectRecvTransport(
      consumerTransport,
      remoteProducerId,
      serverConsumerTransportId
    );
  });
}

async function connectRecvTransport(
  consumerTransport,
  remoteProducerId,
  serverConsumerTransportId
) {
  await socket.emit(
    'consume',
    {
      rtpCapabilities: device.rtpCapabilities,
      remoteProducerId,
      serverConsumerTransportId,
    },
    async ({ params }) => {
      if (params.error) {
        console.log(
          'from connectRecvTransport:consume params.error: ',
          params.error
        );
        return;
      }

      const consumer = await consumerTransport.consume({
        id: params.id,
        producerId: params.producerId,
        kind: params.kind,
        rtpParameters: params.rtpParameters,
      });

      consumerTransports.push({
        consumer,
        consumerTransport,
        serverConsumerTransportId: params.id,
        producerId: remoteProducerId,
      });

      const newDiv = document.createElement('div');
      newDiv.setAttribute('id', `id-${remoteProducerId}`);
      newDiv.setAttribute('class', `remoteVideo`);
      if (params.kind == 'audio') {
        newDiv.innerHTML = `<audio id=${remoteProducerId} autoplay  ></audio>`;
      } else {
        newDiv.innerHTML = `<video id=${remoteProducerId} autoplay class='video' ></video>`;
      }
      videoContainer.appendChild(newDiv);

      const { track } = consumer;

      document.getElementById(remoteProducerId).srcObject = new MediaStream([
        track,
      ]);

      socket.emit('consumer-resume', {
        serverConsumerId: params.serverConsumerId,
      });
    }
  );
}
