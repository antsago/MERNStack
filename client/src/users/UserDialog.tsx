import React, { useState } from 'react'
import {
  makeStyles,
  createStyles,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core'
import { UserInput } from '../utils'

const useStyles = makeStyles(theme =>
  createStyles({
    textField: {
      marginTop: theme.spacing(1)
    }
  })
)

const UserItem = ({
  user,
  open,
  submitAction,
  onClose,
  onSubmit
}: {
  user: UserInput
  open: boolean
  submitAction: string
  onClose: () => void
  onSubmit: (UserInput) => void
}) => {
  const [name, setName] = useState(open ? user.givenName : '')
  const [surname, setSurname] = useState(open ? user.familyName : '')
  const [email, setEmail] = useState(open ? user.email : '')
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <TextField
          className={classes.textField}
          label='Name'
          value={name}
          onChange={event => setName(event.target.value)}
          fullWidth
        />
        <TextField
          className={classes.textField}
          label='Surname'
          value={surname}
          onChange={event => setSurname(event.target.value)}
          fullWidth
        />
        <TextField
          className={classes.textField}
          label='Email'
          type='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant='text' color='primary' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='text' color='primary' onClick={() => onSubmit({
          givenName: name,
          familyName: surname,
          email,
        })}>
          {submitAction}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserItem
