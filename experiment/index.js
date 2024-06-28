import express from 'express';

const app = express();

app.get('/one', (req, res) => {
  // setTimeout(() => {
  let i = 0;
  while (i < 1000000000000) i++;
  res.json({ helk: 11 });
  // }, 6000);
});

app.get('/two', (req, res) => {
  res.json({ helk: 22 });
});

app.listen(4000);
