import React, { Component, ReactNode } from 'react'
import { connect } from 'react-redux'
import { createStyles, withStyles, WithStyles, Container } from '@material-ui/core'
import { addAlert } from '../../utils'
import Header from './Header'
import Footer from './Footer'
import Alert from './Alert'

const styles = theme => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  content: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
})

interface Props extends WithStyles<typeof styles> {
  showAlert: (string) => void,
  children: ReactNode
}

export class Layout extends Component<Props, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.props.showAlert(error.message);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Alert />
        <Header />
        <main>
          <Container className={this.props.classes.content} maxWidth='md'>
            {this.state.hasError ? "Something went wrong" : this.props.children}
          </Container>
        </main>

        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showAlert: (message) => dispatch(addAlert(message))
})

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(Layout))
