"use strict";
const DatabaseHandler = require('./DatabaseHandler');
var ipc;

class IpcHandler {

  databaseHandler;

  constructor(electron) {

    ipc = electron.ipcMain;
    this.databaseHandler = new DatabaseHandler();

  }

  handleCommunication() {

    ipc.on('ping', (event, data) => {
      console.log(data);
      event.returnValue = {a: 'b'};
    });

  }

}

module.exports = IpcHandler;
