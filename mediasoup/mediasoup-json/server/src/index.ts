import express from 'express';
import http from 'http';
import WS from 'ws';
import { WSConnect } from './lib/WS';

const app = express();

const server = http.createServer(app);

const ws = new WS.Server({ server, path: '/ws' });

WSConnect(ws);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  WSConnect(ws);
  console.log('Listening on 4000');
});
