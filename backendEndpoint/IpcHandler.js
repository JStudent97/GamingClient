"use strict";
var ipc;

class IpcHandler {

  constructor(electron) {

    ipc = electron.ipcMain;

  }

  handleCommunication() {

    ipc.on('ping', (event, data) => {
      console.log(data);
      event.returnValue = {a: 'b'};
    });

    ipc.on('test', (event, payload) => {
      console.log(payload.data);
      event.returnValue = 'succes';
    });

  }

}

module.exports = IpcHandler;
