"use strict";
const io = require('socket.io-client');
class WebsocketHandler {
  socket;
  uri = 'ws://localhost:3000';
  mainWindow;

  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    this.socket = io(this.uri);
  }

  listenToWsEvents() {
    this.socket.on('test event', (data) => {
      console.log(`received test event with the payload: ${data}`);
      this.socket.emit('test reply', 'reply to server');
    });

    this.socket.on('read messages', () => {
      this.mainWindow.webContents.send('reload-messages');
    });
  }

  emitEvent(channel, payload) {
    this.socket.emit(channel, payload);
  }

}

module.exports = WebsocketHandler;
