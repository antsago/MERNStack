import React, { PropsWithChildren } from "react"
import { makeStyles, CircularProgress } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  loader: {
    position: "relative",
    left: "50%",
    margin: theme.spacing(3),
  },
}))

interface Props {
  loading: boolean
}

const WaitForLoad = ({ loading, children }: PropsWithChildren<Props>) => {
  const classes = useStyles()

  return (
    <>
      {loading && (
        <CircularProgress className={classes.loader} color="secondary" />
      )}
      {!loading && children}
    </>
  )
}

export default WaitForLoad
