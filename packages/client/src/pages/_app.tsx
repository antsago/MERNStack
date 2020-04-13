import React from "react"
import NextApp from "next/app"
import Head from "next/head"
import withRedux from "next-redux-wrapper"
import withReduxSaga from "next-redux-saga"
import { Provider } from "react-redux"
import { Store } from "redux"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import { getDataFromTree } from "@apollo/react-ssr"
import { theme } from "../components"
import { createStore, withApollo } from "../utils"

class MyApp extends NextApp<{ store: Store }> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, store } = this.props

    return (
      <Provider store={store}>
        <Head>
          <title>Users list</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withRedux(createStore)(
  withReduxSaga(withApollo(MyApp, { getDataFromTree })),
)
