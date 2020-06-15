"use strict";
const DatabaseHandler = require('./DatabaseHandler');
const GamesHandler = require('./GamesHandler');
const WebsocketHandler = require('./WebsocketHandler');
var ipc;

class IpcHandler {

  databaseHandler;
  gamesHandler;
  wsHandler;

  constructor(electron) {
    ipc = electron.ipcMain;
    this.databaseHandler = new DatabaseHandler();
    this.gamesHandler = new GamesHandler();
    this.wsHandler = new WebsocketHandler();
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
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

    ipc.on('fetch-installed-games', (event, data) => {
       event.returnValue = this.gamesHandler.getInstalledGames();
    });

    ipc.on('launch-game', (event, data) => {
      event.returnValue = this.gamesHandler.launchGame(data);
    });

    ipc.on('send-friend-request', async (event, data) => {
      event.returnValue = await this.databaseHandler.createFriendRequest(data.sender, data.recipient);
    });

    ipc.on('get-incoming-friend-requests', async (event, data) => {
      event.returnValue = await this.databaseHandler.getIncomingFriendRequests(data.recipient);
    });

    ipc.on('accept-friend-request', async (event, data) => {
      event.returnValue = await this.databaseHandler.acceptFriendRequest(data.sender, data.recipient);
    });

    ipc.on('deny-friend-request', async (event, data) => {
      event.returnValue = await this.databaseHandler.denyFriendRequest(data.sender, data.recipient);
    });

    ipc.on('get-friends', async (event, data) => {
      event.returnValue = await this.databaseHandler.getFriends(data.username);
    });

    ipc.on('add-message', async (event, data) => {
      // add the message to database
      event.returnValue = await this.databaseHandler.addMessage(data);

      await this.sleep(100);
      // notify other clients through webSockets to read the db
      this.wsHandler.emitEvent('new-message', 'some payload');
    });

    ipc.on('get-messages', async (event, data) => {
      event.returnValue = await this.databaseHandler.getMessages();
    });

  }

}

module.exports = IpcHandler;
