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
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <Fragment>
      {isLoading || !users ? (
        <CircularProgress className={classes.loader} />
      ) : (
          <Grid container spacing={2}>
            {users.map(user => (
              <UserItem
                key={user.id}
                user={user}
                onClick={() => setSelectedUser(user)}
              />
            ))}
          </Grid>
        )}
      <UserDialog
        open={!!selectedUser}
        user={selectedUser}
        submitAction='Update'
        onClose={() => setSelectedUser(null)}
      />
    </Fragment>
  )

  return
}

export default UsersList
