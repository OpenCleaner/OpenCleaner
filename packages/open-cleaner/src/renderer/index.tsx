import React from 'react';
import { render } from 'react-dom';
import { ipcRenderer, remote } from 'electron';
import App from './views/app';
import './assets/main.css';

render(<App />, document.getElementById('app'));

ipcRenderer.on('go-update', (event: any, info: any) => {
  let message = `New release available: ${info.version}`;

  remote.dialog.showMessageBox(
    {
      buttons: ['Install', 'Later'],
      defaultId: 0,
      detail: message,
      message: `New version of ${remote.app.getName()}`,
      type: 'question',
    },
    (response) => {
      if (response === 0) {
        setTimeout(() => ipcRenderer.send('ask-quitAndInstall'), 1);
      }
    },
  );
});
