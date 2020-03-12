import React from 'react'
import {
  makeStyles,
  createStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core'
import { User } from '../utils'

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
  title,
  submitAction,
  onClose
}: {
  user: User
  open: boolean
  title: string
  submitAction: string
  onClose?: () => void
}) => {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.textField}
          value={open ? user.givenName : ''}
          label='Name'
          fullWidth
        />
        <TextField
          className={classes.textField}
          value={open ? user.familyName : ''}
          label='Surname'
          fullWidth
        />
        <TextField
          className={classes.textField}
          value={open ? user.email : ''}
          label='Email'
          fullWidth
          type='email'
        />
      </DialogContent>
      <DialogActions>
        <Button variant='text' color='primary' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='text' color='primary'>
          {submitAction}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserItem
