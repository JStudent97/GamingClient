const {app, BrowserWindow} = require('electron');
const electron = require('electron');
const url = require("url");
const path = require("path");

const IpcHandler = require('./backendEndpoint/IpcHandler');
const ipcHandler = new IpcHandler(electron);
ipcHandler.handleCommunication();

const WebsocketHandler = require('./backendEndpoint/WebsocketHandler');
const wsHandler = new WebsocketHandler();
wsHandler.listenToWsEvents();

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    // 1400 x 950 - body size
    // 1600 x 1009 - size with upper bar (frame)
    width: 1600,
    height: 950,
    webPreferences: {
      nodeIntegration: true
    },
    // don't show the upper bar (frame)
    frame: false
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});

