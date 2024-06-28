const io = require('socket.io-client');
const mediasoupClient = require('mediasoup-client');

const socket = io('/mediasoup');
socket.on('connection-success', ({ socketId, isProducerExist }) => {});

const localVideo = document.getElementById('localVideo');

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
let routerRtpCapabilities;
let producerTransport;
let producer;
let consumerTransport;
let consumer;
let isProducer = false;

const streamSuccess = async (stream) => {
  localVideo.srcObject = stream;
  const track = stream.getVideoTracks()[0];
  params = {
    track,
    ...params,
  };

  goConnect(true);
};

const getLocalStreanm = () => {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
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
    .catch((error) => {});
};

function goConnect(producerOrConsumer) {
  isProducer = producerOrConsumer;
  if (!device) getRtpCapabilities();
  else goCreateTransport();
}

function goConsume(producerOrConsumer) {
  // isProducer = producerOrConsumer;
  // getRtpCapabilities();
  goConnect(false);
}

function getRtpCapabilities() {
  socket.emit('createRoom', (props) => {
    const { rtpCapabilities } = props;

    routerRtpCapabilities = rtpCapabilities;
    createDevice();
  });
}

function goCreateTransport() {
  isProducer ? createSendTransport() : createRecvTransport();
}

async function createDevice() {
  try {
    device = new mediasoupClient.Device();
    await device.load({ routerRtpCapabilities });

    goCreateTransport();
  } catch (error) {
    if (error.name == 'UnsupportedError') {
      console.log('browser does not support');
    }
  }
}

async function createSendTransport() {
  socket.emit(
    'createWebRtcTransport',
    { sender: true },
    ({ params: cbParams }) => {
      if (cbParams.error) {
      }

      producerTransport = device.createSendTransport(cbParams);

      producerTransport.on('connect', async (props, cb, errCb) => {
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
        try {
          await socket.emit(
            'transport-produce',
            {
              transportId: producerTransport.id,
              kind: props.kind,
              rtpParameters: props.rtpParameters,
              appData: props.appData,
            },
            ({ id }) => {
              cb({ id });
            }
          );
        } catch (error) {
          errCb(error);
        }
      });
      connectSendTransport();
    }
  );
}

async function connectSendTransport() {
  producer = await producerTransport.produce(params);
  producer.on('trackended', () => {});
  producer.on('transportclose', () => {});
}

async function createRecvTransport() {
  socket.emit('createWebRtcTransport', { sender: false }, ({ params }) => {
    if (params.error) {
      return;
    }
    consumerTransport = device.createRecvTransport(params);
    consumerTransport.on('connect', async ({ dtlsParameters }, cb, errCb) => {
      try {
        await socket.emit('transport-recv-connect', {
          dtlsParameters,
        });
        cb();
      } catch (error) {
        errCb(error);
      }
    });

    connectRecvTransport();
  });
}
const remoteVideo = document.getElementById('remoteVideo');

async function connectRecvTransport() {
  await socket.emit(
    'consume',
    {
      rtpCapabilities: device.rtpCapabilities,
    },
    async ({ params }) => {
      if (params.error) {
        return;
      }

      consumer = await consumerTransport.consume({
        id: params.id,
        producerId: params.producerId,
        kind: params.kind,
        rtpParameters: params.rtpParameters,
      });

      const { track } = consumer;

      remoteVideo.srcObject = new MediaStream([track]);
      socket.emit('consumer-resume');
    }
  );
}

const btnPublish = document.getElementById('btnPublish'),
  btnConsume = document.getElementById('btnConsume');

btnPublish.addEventListener('click', getLocalStreanm);
btnConsume.addEventListener('click', () => goConsume(false));
