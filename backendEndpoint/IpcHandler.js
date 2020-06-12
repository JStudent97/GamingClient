"use strict";
const DatabaseHandler = require('./DatabaseHandler');
const GamesHandler = require('./GamesHandler');
var ipc;

class IpcHandler {

  databaseHandler;
  gamesHandler;

  constructor(electron) {
    ipc = electron.ipcMain;
    this.databaseHandler = new DatabaseHandler();
    this.gamesHandler = new GamesHandler();
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
    });

    ipc.on('fetch-all-games', async (event, data) => {
      event.returnValue = await this.gamesHandler.getGamesDetails();
    });

  }

}

module.exports = IpcHandler;
