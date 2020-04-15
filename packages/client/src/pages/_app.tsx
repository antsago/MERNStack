import React from "react"
import NextApp from "next/app"
import Head from "next/head"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import { getDataFromTree } from "@apollo/react-ssr"
import { theme } from "../components"
import { withApollo } from "../utils"

class MyApp extends NextApp {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Users list</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}

export default withApollo(MyApp, { getDataFromTree })
