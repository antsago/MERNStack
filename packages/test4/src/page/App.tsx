import React, { useEffect } from 'react';
import { CssBaseline, ThemeProvider}from "@material-ui/core"
import theme from '../page/theme';

interface Props {
   name: string
}

const App = ({ name }: Props) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>Hello {name}</div>
    </ThemeProvider>
  )
}

export default App;
