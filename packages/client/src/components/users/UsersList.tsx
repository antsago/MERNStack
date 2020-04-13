import React, { useState } from "react"
import { makeStyles, Grid, CircularProgress } from "@material-ui/core"
import { User, UserInput } from "@mernstack/shared"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import UserItem from "./UserItem"
import UserDialog from "./UserDialog"

const useStyles = makeStyles((theme) => ({
  loader: {
    position: "relative",
    left: "50%",
    margin: theme.spacing(3),
  },
}))

const USERS_QUERY = gql`
  {
    users {
      id
      givenName
      familyName
      email
      created
    }
  }
`

const UsersList = ({
  users,
  isLoading,
  deleteUser,
  updateUser,
}: {
  users: User[]
  isLoading: boolean
  deleteUser: (id: string) => void
  updateUser: (id: string, changedUser: UserInput) => void
}) => {
  const { loading, data } = useQuery(USERS_QUERY)
  const classes = useStyles()
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <>
      <Grid container spacing={2}>
        {users.map((user) => (
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
          onSubmit={(changes) => {
            updateUser(selectedUser.id, changes)
            setSelectedUser(null)
          }}
        />
      )}
    </>
  )
}

export default UsersList
