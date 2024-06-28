import express from 'express';

const app = express();
let count = 0;

app.get('/one', (_, res) => {
  setTimeout(() => {
    count++;
    res.send('hello');
  }, 10);
});

app.get('/two', (_, res) => {
  res.send('count: ' + count);
});

app.listen(4000, () => {
  console.log('Listeinign on 4000');
});
