const cluster = require('node:cluster');

console.log(process.cwd() + '/server.js');

cluster.setupMaster({
  exec: './server.js',
});

cluster.fork();
cluster.fork();
cluster.fork();
cluster.fork();

console.log('master: ', process.pid);

cluster
  .on('disconnet', (worker) => {
    console.log('disconnected: ', worker.id);
  })
  .on('exit', (worker, code, signal) => {
    console.log('exit: ', worker.id, ', code: ', code, ', signal: ', signal);
  })
  .on('listening', (worker, { address, port }) => {
    console.log('listening: ', worker.id, `${address}:${port}`);
  });
