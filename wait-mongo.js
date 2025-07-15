const net = require('net');

const host = '127.0.0.1';
const port = 27017;
const maxRetries = 60; // Augmenté à 60 tentatives (2 minutes)
let retries = 0;

const checkConnection = () => {
  const socket = new net.Socket();
  socket.setTimeout(3000); // Délai d'attente de 3 secondes par tentative
  socket.on('connect', () => {
    console.log('MongoDB is ready');
    socket.destroy();
    process.exit(0);
  });
  socket.on('timeout', () => {
    socket.destroy();
    retry();
  });
  socket.on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
    socket.destroy();
    retry();
  });
  socket.connect(port, host);
};

const retry = () => {
  retries++;
  if (retries >= maxRetries) {
    console.error('Max retries reached. Exiting.');
    process.exit(1);
  }
  console.log(`Waiting for MongoDB... Retry ${retries}/${maxRetries}`);
  setTimeout(checkConnection, 3000); // Attendre 3 secondes avant de réessayer
};

checkConnection();