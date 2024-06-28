import express from 'express';
// import https from 'httpolyglot';
import fs from 'fs';
import ngrok from 'ngrok';

import path from 'path';

const app = express();

app.use('/', (req, res) => {
  res.send('ok');
});

// const httpsServer = https.createServer(
//   {
//     key: fs.readFileSync(path.join(process.cwd(), 'ssl', 'key.pem')),
//     cert: fs.readFileSync(path.join(process.cwd(), 'ssl', 'cert.pem')),
//   },
//   app
// );

app.listen(4000, () => {
  console.log(`Listening on 4000`);
  ngrok
    .connect(4000)
    .then((uri) => {
      console.log('ngrok uri: ', uri);
    })
    .catch((err) => {
      console.log('err : ', err);
    });
});
