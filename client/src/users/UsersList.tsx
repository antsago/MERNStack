import React, { Fragment, useState } from 'react'
import { makeStyles, Grid, CircularProgress } from '@material-ui/core'
import { User } from '../utils'
import UserItem from './UserItem'
import UserDialog from './UserDialog'

const useStyles = makeStyles(theme => ({
  loader: {
    position: 'relative',
    left: '50%'
  }
}))

const UsersList = ({
  users,
  isLoading
}: {
  users: User[]
  isLoading: boolean
}) => {
  const classes = useStyles()
  const [isDialogOpen, setDialogOpen] = useState(false)

  return (
    <Fragment>
      {isLoading || !users ? (
        <CircularProgress className={classes.loader} />
      ) : (
          <Grid container spacing={4}>
            {users.map(user => (
              <UserItem key={user.id} user={user} onClick={() => setDialogOpen(true)} />
            ))}
          </Grid>
        )}
      <UserDialog open={isDialogOpen} title="Update user" onClose={() => setDialogOpen(false)} />
    </Fragment>
  )

  return
}

export default UsersList
