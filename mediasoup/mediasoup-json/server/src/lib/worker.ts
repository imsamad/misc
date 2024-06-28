import mediasoup from 'mediasoup';

import { Worker } from 'mediasoup/node/lib/Worker';
import { Router } from 'mediasoup/node/lib/Router';

import { config } from './config';

const worker: Array<[worker: Worker, router: Router]> = [];

let nextMediasoupWorkerIds = 0;

const createWorker = async () => {
  const worker = await mediasoup.createWorker({
    logLevel: config.mediasoup.worker.logLevel,
    logTags: config.mediasoup.worker.logTags,
    rtcMinPort: config.mediasoup.worker.rtcMinPort,
    rtcMaxPort: config.mediasoup.worker.rtcMaxPort,
  });

  worker.on('died', () => {
    console.error(
      `mediasoup worker died, exiting in 2 seconds... [pid:&d]`,
      worker.pid
    );
    setTimeout(() => {
      process.exit(1);
    }, 2000);
  });
  const mediaCodecs = config.mediasoup.router.mediaCodes;
  const mediasoupRouters = await worker.createRouter({ mediaCodecs });
  return mediasoupRouters;
};

export { createWorker };
