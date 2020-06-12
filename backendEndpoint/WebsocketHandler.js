"use strict";
const io = require('socket.io-client');
class WebsocketHandler {
  socket;
  uri = 'ws://localhost:3000';

  constructor() {
    this.socket = io(this.uri);
  }

  listenToWsEvents() {
    this.socket.on('test event', (data) => {
      console.log(`received test event with the payload: ${data}`);
      this.socket.emit('test reply', 'reply to server');
    });
  }

}

module.exports = WebsocketHandler;
