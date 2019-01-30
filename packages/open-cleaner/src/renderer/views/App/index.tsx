import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route } from "react-router";
import Home from "../Home";
import About from "../About";

import "./styles.scss";

const theme = createMuiTheme();

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </MuiThemeProvider>
    );
  }
}

export default App;
