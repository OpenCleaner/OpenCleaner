import { app, BrowserWindow } from 'electron';
import log from 'electron-log';
import Main from './main';

const onError = (error: any) => {
  log.transports.file.level = 'error';
  log.error(error);
};

process.on('uncaughtException', onError);
process.on('unhandledRejection', onError);

Main.main(app, BrowserWindow);
