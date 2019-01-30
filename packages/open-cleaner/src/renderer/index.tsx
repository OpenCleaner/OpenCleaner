import { ipcRenderer, remote } from "electron";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./assets/main.css";
import App from "./views/app";

// Import fonts
import "typeface-roboto";
// import 'material-design-icons';

render(<Router><App /></Router>, document.getElementById("app"));

ipcRenderer.on("go-update", (event: any, info: any) => {
  const message = `New release available: ${info.version}`;

  remote.dialog.showMessageBox(
    {
      buttons: ["Install", "Later"],
      defaultId: 0,
      detail: message,
      message: `New version of ${remote.app.getName()}`,
      type: "question",
    },
    (response) => {
      if (response === 0) {
        setTimeout(() => ipcRenderer.send("ask-quitAndInstall"), 1);
      }
    },
  );
});
