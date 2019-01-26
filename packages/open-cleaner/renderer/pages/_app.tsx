import React from 'react'
import App, { Container } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { default as CssBaseline } from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '../lib/get-page-context'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { Divider } from '@material-ui/core';
import { mainListItems, secondaryListItems } from '../components/main-menu';

class MyApp extends App {
  pageContext = null

  constructor(props) {
    super(props)
    this.pageContext = getPageContext()
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <JssProvider registry={this.pageContext.sheetsRegistry} generateClassName={this.pageContext.generateClassName}>
          <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
            <CssBaseline />
            <Grid container>
              <Grid item>
                <List>{mainListItems}</List>
                <Divider/>
                <List>{secondaryListItems}</List>
              </Grid>
              <Grid item>
                <Component pageContext={this.pageContext} {...pageProps} />
              </Grid>
            </Grid>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

export default MyApp
