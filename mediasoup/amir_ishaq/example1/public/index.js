const io = require('socket.io-client');

const mediasoupClient = require('mediasoup-client');

const socket = io('/mediasoup');

socket.on('connection-success', ({ socketId }) => {
  console.log('socket connection established: ', socketId);
});

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

const streamSuccess = async (stream) => {
  localVideo.srcObject = stream;
  const track = stream.getVideoTracks()[0];
  params = {
    track,
    ...params,
  };
};

const getLocalStreanm = () => {
  navigator.getUserMedia(
    {
      audio: false,
      video: {
        width: 640,
        max: 1920,
      },
      height: {
        min: 400,
        max: 1080,
      },
    },
    streamSuccess,
    (error) => {
      console.log('error from navigator.getUserMedia: ', error.message);
    }
  );
};

const getRtpCapabilities = () => {
  socket.emit('getRtpCapabilities', (props) => {
    const { rtpCapabilities } = props;
    console.log('getRtpCapabilities: ', rtpCapabilities);
    routerRtpCapabilities = rtpCapabilities;
  });
};

const createDevice = async () => {
  try {
    device = new mediasoupClient.Device();
    await device.load({ routerRtpCapabilities });
    console.log('createDevice: ', device);
  } catch (error) {
    console.log('error from createDevice: ', error);
    if (error.name == 'UnsupportedError')
      console.log('browser does not support');
  }
};

const createSendTransport = () => {
  socket.emit(
    'createWebRtcTransport',
    { sender: true },
    ({ params: cbParams }) => {
      if (cbParams.error) {
        console.log('on createWebRtcTransport error: ', cbParams.error);
      }
      console.log('cbParams from createSendTransport: ', cbParams);

      producerTransport = device.createSendTransport(cbParams);
      console.log('producerTransport: ', producerTransport);
      producerTransport.on('connect', async (props, cb, errCb) => {
        console.log('producerTransport on connect - props: ', props);
        try {
          await socket.emit('transport-connect', {
            // transportId: producerTransport.id,
            dtlsParameters: props.dtlsParameters,
          });
          cb();
        } catch (error) {
          errCb(error);
        }
      });

      producerTransport.on('produce', async (props, cb, errCb) => {
        console.log(`producerTransport produce - props: `, props);
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
              console.log('id propsCB: ', id);
              cb({ id });
            }
          );
          // cb();
        } catch (error) {
          errCb(error);
        }
      });
    }
  );
};

const connectSendTransport = async () => {
  console.log('params: ', params);
  producer = await producerTransport.produce(params);
  producer.on('trackended', () => {});
  producer.on('transportclose', () => {});
};

const createRecvSendTransport = async () => {
  socket.emit('createWebRtcTransport', { sender: false }, ({ params }) => {
    if (params.error) {
      console.log(params.error);
      return;
    }
    consumerTransport = device.createRecvTransport(params);
    consumerTransport.on('connect', async ({ dtlsParameters }, cb, errCb) => {
      try {
        await socket.emit('transport-recv-connect', {
          // transportId: consumerTransport.id,
          dtlsParameters,
        });
        cb();
      } catch (error) {
        errCb(error);
      }
    });
    console.log(params);
  });
};
const remoteVideo = document.getElementById('remoteVideo');

const createRecvTransport = async () => {
  await socket.emit(
    'consume',
    {
      rtpCapabilities: device.rtpCapabilities,
    },
    async ({ params }) => {
      if (params.error) {
        console.log(
          'from createRecvTransport:consume params.error: ',
          params.error
        );
        return;
      }
      console.log('params: ', params);
      consumer = await consumerTransport.consume({
        id: params.id,
        producerId: params.producerId,
        kind: params.kind,
        rtpParameters: params.rtpParameters,
      });
      console.log('consumer ', consumer);
      const { track } = consumer;
      console.log('track: ', track);
      remoteVideo.srcObject = new MediaStream([track]);
      socket.emit('consumer-resume');
    }
  );
};

const btnLocalVideo = document.getElementById('btnLocalVideo'),
  btnRtpCapabilities = document.getElementById('btnRtpCapabilities'),
  btnCreateDevice = document.getElementById('btnCreateDevice'),
  btnCreateSendTransport = document.getElementById('btnCreateSendTransport'),
  btnConnectSendTransport = document.getElementById('btnConnectSendTransport'),
  btnRecvSendTransport = document.getElementById('btnRecvSendTransport'),
  btnConnectRecvTransport = document.getElementById('btnConnectRecvTransport');

const all = async () => {
  setTimeout(() => {
    getLocalStreanm();
  }, 1000);
  setTimeout(() => {
    getRtpCapabilities();
  }, 2000);
  setTimeout(() => {
    createDevice();
  }, 3000);
  setTimeout(() => {
    createSendTransport();
  }, 4000);
  setTimeout(() => {
    connectSendTransport();
  }, 5000);
  setTimeout(() => {
    createRecvSendTransport();
  }, 6000);
  setTimeout(() => {
    createRecvTransport();
  }, 7000);
};

// btnLocalVideo.addEventListener('click', getLocalStreanm);
btnLocalVideo.addEventListener('click', all);
btnRtpCapabilities.addEventListener('click', getRtpCapabilities);
btnCreateDevice.addEventListener('click', createDevice);
btnCreateSendTransport.addEventListener('click', createSendTransport);
btnConnectSendTransport.addEventListener('click', connectSendTransport);
btnRecvSendTransport.addEventListener('click', createRecvSendTransport);

btnConnectRecvTransport.addEventListener('click', createRecvTransport);
