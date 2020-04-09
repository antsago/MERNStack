import React from "react"
import { makeStyles } from "@material-ui/core"
import Copyright from "./Copyright"

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Copyright />
    </footer>
  )
}

export default Footer
