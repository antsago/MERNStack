import React, { useState } from "react"
import { Grid } from "@material-ui/core"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import { useUpdateUser, useGetUsers } from "../../utils"
import WaitForLoad from "../WaitForLoad"
import UserItem from "./UserItem"
import UserDialog from "./UserDialog"

const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      givenName
      familyName
      email
      created
    }
  }
`

const UsersList = () => {
  const { loading, data } = useGetUsers()
  const updateUser = useUpdateUser()
  const [deleteUser] = useMutation(DELETE_USER)
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
                onDelete={() => deleteUser({ variables: { id: user.id } })}
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
            updateUser(selectedUser.id, changes)
            setSelectedUser(null)
          }}
        />
      )}
    </>
  )
}

export default UsersList
