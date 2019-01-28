import { isDevelopment } from 'common/env';
import { BrowserWindow, ipcMain, Menu } from 'electron';
import { join } from 'path';
import { template } from './menu';
import { appUpdater } from './updater';

declare var __static: string;

export default class Main {
  private static mainWindow: Electron.BrowserWindow | null;
  private static application: Electron.App;
  private static BrowserWindow: typeof Electron.BrowserWindow;

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }

  private static onActivate() {
    if (Main.mainWindow === null) {
      Main.onReady();
    }
  }

  private static onClose() {
    Main.mainWindow = null;
  }

  private static onReady() {
    Main.mainWindow = new Main.BrowserWindow({
      center: true,
      height: 900,
      minHeight: 600,
      minWidth: 800,
      webPreferences: {
        nodeIntegration: true,
      },
      width: 1600,
    });
    const url = isDevelopment
      ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
      : `file://${__dirname}/index.html`;

    if (isDevelopment) {
      Main.mainWindow.webContents.openDevTools();
    }
    Main.mainWindow.loadURL(url);
    Main.mainWindow.on('closed', Main.onClose);
    Main.mainWindow.webContents.on('devtools-opened', () => {
      Main.mainWindow!.focus();
      setImmediate(Main.mainWindow!.focus);
    });
    if (isDevelopment) {
      Main.BrowserWindow.addDevToolsExtension(join(__static, 'devtools/react'));
    }
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    if (!isDevelopment) {
      ipcMain.on('ask-update', (event: any, channel: string) =>
        appUpdater(Main.mainWindow, channel),
      );
    }
  }

  public static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('activate', Main.onActivate);
    Main.application.on('ready', Main.onReady);
  }
}
