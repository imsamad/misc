import WebSocket from 'ws';
import { createWorker } from './worker';
import mediasoup from 'mediasoup';

const WSConnect = async (webSock: WebSocket.Server) => {
  let mediasoupRouter: mediasoup.types.Router<mediasoup.types.AppData>;
  try {
    mediasoupRouter = await createWorker();
  } catch (err) {}
  webSock.on('connection', (ws) => {
    ws.on('message', (jsonMessage) => {
      const message = isJson(jsonMessage);
      if (!message) return;
      const evt = JSON.parse(message);
      switch (evt.type) {
        case 'getRouterRtpCapabilities':
          onRouterRtpCapabilities(evt, ws);

          break;
        default:
          break;
      }
      console.log(message);
      ws.send('Hello! Listening.');
    });
    const onRouterRtpCapabilities = (evt: string, ws: WebSocket) => {
      send(ws, 'routerCapabilities', mediasoupRouter.rtpCapabilities);
    };

    const send = (ws: WebSocket, type: string, msg: any) => {
      const message = {
        data: msg,
        type,
      };
    };
    const isJson = (str: any) => {
      try {
        return JSON.parse(str);
      } catch (err) {
        return '';
      }
    };
  });

  const loadDevice = async (routerCapabilities) => {};
};
//  const send=(event:sting)
export { WSConnect };
