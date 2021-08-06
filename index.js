// import dotenv and call config function to load environment
require('dotenv').config();
const express = require('express');

const cors = require('cors');

// import this
const http = require('http');
const { Server } = require('socket.io');

// Get routes to the variabel
const router = require('./src/routes');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL, // we must define cors because our client and server have diffe
  },
});

// import socket function and call with parameter io
require('./src/socket')(io);

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Add endpoint grouping and router
app.use('/api/v1/', router);
app.use('/uploads', express.static('uploads'));

app.get('/', function (req, res) {
  res.send({
    TOKEN_KEY: process.env.TOKEN_KEY,
    MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
    MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY,
    SYSTEM_EMAIL: process.env.SYSTEM_EMAIL,
    SYSTEM_PASSWORD: process.env.SYSTEM_PASSWORD,
  });
});

// change app to server
server.listen(port, () => console.log(`Listening on port ${port}!`));
