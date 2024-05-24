const { app, BrowserWindow, ipcMain, clipboard, session } = require('electron');
const path = require('path');
const fs = require('fs');

// Define the cache directory
const cacheDir = path.join(app.getPath('userData'), 'cache');

// Ensure the cache directory exists and has the correct permissions
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}
fs.chmodSync(cacheDir, 0o755); // Set permissions

// Set the cache path for the Electron app
app.setPath('cache', cacheDir);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      sandbox: true,
      enableRemoteModule: false,
    },
    title: 'Grünerator',
    icon: path.join(__dirname, 'icons', 'GRÜNERATOR_Logo.png'),
  });

  mainWindow.loadFile('start.html');

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  // Set the cache directory for sessions
  const defaultSession = session.defaultSession;
  defaultSession.setCacheDirectory(cacheDir);
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for clipboard operations
ipcMain.on('write-to-clipboard', (event, text) => {
  clipboard.writeText(text);
});

ipcMain.handle('read-from-clipboard', async () => {
  return clipboard.readText();
});
