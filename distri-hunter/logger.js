require('dotenv').config({});
// const fetch = require('node-fetch');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;
const TARGET = process.env.TARGET || 'localhost:3000';
const log = require('./logstash.js');

const express = require('express');

const app = express();

app.get('/one', async (req, res) => {
  log('info', 'request-incoming', {
    path: req.url,
    method: req.method,
    ip: req.ip,
    ua: req.headers['user-agent'] || null,
  });

  res.json({
    message: 'ok',
  });

  //   log('error', 'request-failure', {
  //     stack: error.stack,
  //     path: req.url,
  //     method: req.method,
  //   });
  //   return { error: error.message };

  //   const url = `http://${TARGET}/recipes/42`;
  //   log('info', 'request-outgoing', { url, svc: 'recipe-api' });
  //   const req = await fetch(url);
  //   const producer_data = await req.json();
  //   return { consumer_pid: process.pid, producer_data };
  //   next();
});

app.listen(PORT, HOST, () => {
  console.log('On on localhost:4000');
});
