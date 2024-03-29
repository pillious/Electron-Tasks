// Native
import { dirname, join } from 'path';
import { fileURLToPath, format } from 'url';

// Packages
import { BrowserWindow, app } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from './electron-next/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Prepare the renderer once the app is ready
app.on('ready', async () => {
    await prepareNext('./renderer');

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 500,
        minWidth: 500,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: join(__dirname, 'preload.js'),
        },
        autoHideMenuBar: true
    });

    const url = isDev
        ? 'http://localhost:8000/'
        : format({
              pathname: join(__dirname, '../renderer/out/index.html'),
              protocol: 'file:',
              slashes: true,
          });

    mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);
