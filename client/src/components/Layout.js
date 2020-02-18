import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const Layout = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {props.children}
        </Container>
      </main>

      <Footer />
    </React.Fragment>
  );
}

export default Layout;