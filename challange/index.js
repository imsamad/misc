import 'express-async-errors';
import express from 'express';
import { CustomError } from './lib.js';

const app = express();
app.use(express.json());

let data = [];

app.get('/data', (req, res) => {
  res.json({
    data,
  });
});

app.post('/data', (req, res) => {
  const reqData = req.body.data;
  if (
    !reqData ||
    reqData.length != 500 ||
    !reqData.every((d) => d && typeof Number(d) == 'number')
  )
    throw new CustomError({
      message: 'Provide list of 500 numbers exactly!',
    });

  data = reqData.sort();
});

app.use(() => {
  throw new CustomError('Not found', 400);
});

app.use((err, _, res, __) => {
  if (err instanceof CustomError)
    res.status(err.status).json({
      error: err.message,
    });

  res.status(500).json({
    message: 'Under maintenance!',
  });
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
