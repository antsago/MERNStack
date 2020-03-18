import React, { Fragment, useState } from 'react'
import { makeStyles, Grid, CircularProgress } from '@material-ui/core'
import { User, UserInput } from '../../utils'
import UserItem from './UserItem'
import UserDialog from './UserDialog'

const useStyles = makeStyles(theme => ({
  loader: {
    position: 'relative',
    left: '50%',
    margin: theme.spacing(3)
  }
}))

const UsersList = ({
  users,
  isLoading,
  deleteUser,
  updateUser
}: {
  users: User[]
  isLoading: boolean
  deleteUser: (string) => void
  updateUser: (string, UserInput) => void
}) => {
  const classes = useStyles()
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <Fragment>
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
      {isLoading && <CircularProgress className={classes.loader} />}
      {!!selectedUser && (
        <UserDialog
          open={!!selectedUser}
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSubmit={changes => {
            updateUser(selectedUser.id, changes)
            setSelectedUser(null)
          }}
        />
      )}
    </Fragment>
  )
}

export default UsersList
