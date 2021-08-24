const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 450,
    // frame:false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    // when it is in development mode, it opens in browser.
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(`http://localhost:3000`);
  } else {
    // when it is production mode, we are open the electron app
    // need to yarn build first, and then yarn start.
    mainWindow.loadFile('index.html').loadURL(
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
}

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
