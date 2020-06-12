const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (client) => {
  console.log(`User with id ${client.id} connected`);

  client.emit('test event', 'here is some data');

  client.on('test reply', (payload) => {
    console.log(`received back an event with the following payload: ${payload}`);
  });

});

server.listen(3000, () => {
  console.log('Socket.io server is listening on port 3000');
});
