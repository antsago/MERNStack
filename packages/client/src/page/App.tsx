import React, { useEffect } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import { ApolloClient } from "apollo-client"
import { NormalizedCacheObject } from "apollo-cache-inmemory"
import { ApolloProvider } from "@apollo/react-hooks"
import { theme, Home } from "./view"

interface Props {
  client: ApolloClient<NormalizedCacheObject>
}

const App = ({ client }: Props) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App
