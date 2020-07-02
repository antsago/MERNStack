import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
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
      <div>Hello {name}</div>
    </ThemeProvider>
  )
}

export default App;
