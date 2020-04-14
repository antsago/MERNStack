import React from "react"
import { connect } from "react-redux"
import { Snackbar, IconButton, Slide } from "@material-ui/core"
import { Close as CloseIcon } from "@material-ui/icons"
import { dismissAlert, useGetShownAlert } from "../../utils"

export const Alert = ({ onDismiss }: { onDismiss: () => void }) => {
  const alert = useGetShownAlert()
  return alert ? (
    <Snackbar
      key={alert.id}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      TransitionComponent={(props) => <Slide {...props} direction="left" />}
      autoHideDuration={6000}
      onClose={() => console.log("Close!")}
      message={alert.message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onDismiss}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      open
    />
  ) : null
}

const mapDispatchToProps = (dispatch) => ({
  onDismiss: () => dispatch(dismissAlert()),
})

export default connect(null, mapDispatchToProps)(Alert)
