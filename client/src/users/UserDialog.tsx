import React from 'react'
import {
  makeStyles,
  createStyles,
  Dialog,
  DialogTitle,
  TextField,
  Button
} from '@material-ui/core'
import { User } from '../utils'

const useStyles = makeStyles(theme =>
  createStyles({
    form: {
      margin: theme.spacing(3),
      marginTop: 0
    },
    textField: {
      marginTop: theme.spacing(1)
    },
    buttonGroup: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'space-between'
    }
  })
)

const UserItem = ({
  user,
  open,
  title,
  submitAction,
  secondaryAction,
  onClose
}: {
  user: User
  open: boolean
  title: string
  submitAction: string
  secondaryAction: string
  onClose?: () => void
}) => {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <form className={classes.form}>
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
        <div className={classes.buttonGroup}>
          <Button variant='outlined' color='secondary'>
            {secondaryAction}
          </Button>
          <Button variant='contained' color='primary'>
            {submitAction}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default UserItem
