import React, { Component, PropsWithChildren } from "react"
import {
  createStyles,
  withStyles,
  WithStyles,
  Container,
} from "@material-ui/core"
import { withAddAlert, WithAddAlert } from "../../utils"
import Header from "./Header"
import Footer from "./Footer"
import Alerts from "./Alert"

const styles = (theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    content: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  })

type Props = PropsWithChildren<WithStyles<typeof styles> & WithAddAlert>

export class Layout extends Component<Props, { hasError: boolean }> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  async componentDidCatch(error) {
    await this.props.addAlert(error.message)
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Alerts />
        <Header />
        <main>
          <Container className={this.props.classes.content} maxWidth="md">
            {this.state.hasError ? "Something went wrong" : this.props.children}
          </Container>
        </main>

        <Footer />
      </div>
    )
  }
}

export default withAddAlert(withStyles(styles)(Layout))
