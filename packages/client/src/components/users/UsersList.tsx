import React, { useState } from "react"
import { Grid } from "@material-ui/core"
import { User, UserInput } from "@mernstack/shared"
import { gql } from "apollo-boost"
import { useQuery, useMutation } from "@apollo/react-hooks"
import UserItem from "./UserItem"
import UserDialog from "./UserDialog"
import WaitForLoad from "../WaitForLoad"

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

const UPDATE_USER = gql`
  mutation updateUser($id: String!, $user: UserInput!) {
    updateUser(id: $id, user: $user) {
      id
      givenName
      familyName
      email
      created
    }
  }
`

const UsersList = ({ deleteUser }: { deleteUser: (id: string) => void }) => {
  const { loading, data } = useQuery<{ users: User[] }>(USERS_QUERY)
  const [updateUser] = useMutation(UPDATE_USER)
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <>
      <WaitForLoad loading={loading}>
        <Grid container spacing={2}>
          {data &&
            data.users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                onUpdate={() => setSelectedUser(user)}
                onDelete={() => deleteUser(user.id)}
              />
            ))}
        </Grid>
      </WaitForLoad>
      {!!selectedUser && (
        <UserDialog
          open={!!selectedUser}
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSubmit={(changes) => {
            updateUser({ variables: { id: selectedUser.id, user: changes } })
            setSelectedUser(null)
          }}
        />
      )}
    </>
  )
}

export default UsersList
