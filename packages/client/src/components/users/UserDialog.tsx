import React, { useState } from "react"
import {
  makeStyles,
  createStyles,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core"
import { UserInput } from "@mernstack/shared"

const useStyles = makeStyles((theme) =>
  createStyles({
    textField: {
      marginTop: theme.spacing(1),
    },
  }),
)

const UserItem = ({
  user,
  open,
  onClose,
  onSubmit,
}: {
  user: UserInput
  open: boolean
  onClose: () => void
  onSubmit: (user: UserInput) => Promise<void>
}) => {
  const [name, setName] = useState((user && user.givenName) || "")
  const [surname, setSurname] = useState((user && user.familyName) || "")
  const [email, setEmail] = useState((user && user.email) || "")
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <TextField
          className={classes.textField}
          label="Name"
          id="user-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
        <TextField
          className={classes.textField}
          label="Surname"
          id="user-surname"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
          fullWidth
        />
        <TextField
          className={classes.textField}
          label="Email"
          type="email"
          id="user-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={async () =>
            onSubmit({
              givenName: name,
              familyName: surname,
              email,
            })
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserItem
