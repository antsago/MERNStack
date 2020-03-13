import React from 'react'
import { makeStyles, Container } from '@material-ui/core'
import Header from './Header'
import Footer from './Footer'
import Alert from './Alert'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  content: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}))

const Layout = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Alert />
      <Header />
      <main>
        <Container className={classes.content} maxWidth='md'>
          {props.children}
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default Layout
