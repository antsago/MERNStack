import React, { Fragment, useState } from 'react'
import { makeStyles, Grid, CircularProgress } from '@material-ui/core'
import { User, UserInput } from '../../utils'
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
  isLoading,
  deleteUser,
  updateUser
}: {
  users: User[]
  isLoading: boolean,
  deleteUser: (string) => void,
  updateUser: (UserInput) => void,
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
                onUpdate={() => setSelectedUser(user)}
                onDelete={() => deleteUser(user.id)}
              />
            ))}
          </Grid>
        )}
      {!!selectedUser && (
        <UserDialog
          open={!!selectedUser}
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSubmit={changes => {
            updateUser(changes)
            setSelectedUser(null)
          }}
        />
      )}
    </Fragment>
  )
}

export default UsersList
