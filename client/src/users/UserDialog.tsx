import React from 'react'
import {
  makeStyles,
  createStyles,
  Dialog,
  DialogTitle,
  TextField,
  Button
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  form: {
    margin: theme.spacing(3),
    marginTop: 0,
  },
  buttonGroup: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

const UserItem = ({ open, title, onClose }: { open: boolean, title: string, onClose?: () => void }) => {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <form className={classes.form}>
        <TextField label="Name" fullWidth />
        <TextField label="Surname" fullWidth />
        <TextField label="Email" fullWidth type="email" />
        <div className={classes.buttonGroup}>
          <Button variant="outlined" color="secondary">
            Delete
          </Button>
          <Button variant="contained" color="primary">
            Update
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default UserItem
