import React from "react"
import { Snackbar } from "@material-ui/core"
import { useDismissAlert, useGetShownAlert } from "../../utils"

const Alerts = () => {
  const alert = useGetShownAlert()
  const dismissAlert = useDismissAlert()

  return alert ? (
    <Snackbar
      key={alert.id}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      autoHideDuration={5000}
      onClose={async (_, reason) => {
        if (reason !== "clickaway") {
          await dismissAlert(alert.id)
        }
      }}
      message={alert.message}
      open
    />
  ) : null
}

export default Alerts
