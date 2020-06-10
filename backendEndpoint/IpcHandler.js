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

    ipc.on('create-user', async (event, data) => {
      event.returnValue = await this.databaseHandler.createUser(data.email, data.username, data.password);
    });

    ipc.on('login-user', async (event, data) => {
      event.returnValue = await this.databaseHandler.loginUser(data.username, data.password);
    })

  }

}

module.exports = IpcHandler;
