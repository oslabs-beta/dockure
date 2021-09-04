const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const server = require('../server/server.js')

require('../server/server');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    // when it is in development mode, it opens in browser.
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(`http://localhost:3000`);
  } else {
    // when it is production mode, we are open the electron app
    // need to yarn build first, and then yarn start.
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('maximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('unmaximized');
  });
}

ipcMain.handle('minimize-event', () => {
  mainWindow.minimize();
});

ipcMain.handle('maximize-event', () => {
  mainWindow.maximize();
});

ipcMain.handle('unmaximize-event', () => {
  mainWindow.unmaximize();
});

ipcMain.handle('close-event', () => {
  app.quit();
});

app.on('browser-window-focus', () => {
  mainWindow.webContents.send('focused');
});

app.on('browser-window-blur', () => {
  mainWindow.webContents.send('blurred');
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // on macOS it is common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // on OS X it is common for applications and their menu bar to stay active until the user quits explicity with Cmd + Q.
  if (process.platform !== 'darwin') app.quit();
});
