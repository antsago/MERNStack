import React, { useEffect } from 'react'
import { CssBaseline, ThemeProvider} from "@material-ui/core"
import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from "apollo-cache-inmemory"
import { ApolloProvider } from '@apollo/react-hooks'
import theme from './theme'
import Page from './Page'

interface Props {
  client: ApolloClient<NormalizedCacheObject> 
}

const App = ({ client }: Props) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Page />
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App;
