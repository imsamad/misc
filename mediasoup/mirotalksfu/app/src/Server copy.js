const express = require('express')
const http = require('http');
const https = require('httpolyglot');

const app = express()

const options = {
    cert: fs.readFileSync(path.join(__dirname, config.server.ssl.cert), 'utf-8'),
    key: fs.readFileSync(path.join(__dirname, config.server.ssl.key), 'utf-8'),
};

const httpsServer = https.createServer(options, app);
