const http = require('node:http');

const process = require('node:process');

http
  .createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  })
  .listen(3000, () => {
    //  console.log('UV_THREADPOOL_SIZE', process.env.UV_THREADPOOL_SIZE);
    console.log(`Listenin ${process.pid} is running`);
  });
