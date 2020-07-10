import React, { useState } from "react"
import { Grid } from "@material-ui/core"
import { useUpdateUser, useGetUsers, useDeleteUser } from "../../utils"
import WaitForLoad from "../WaitForLoad"
import UserItem from "./UserItem"
import UserDialog from "./UserDialog"

const UsersList = () => {
  const { loading, users } = useGetUsers()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <>
      <WaitForLoad loading={loading}>
        <Grid container spacing={2}>
          {users &&
            users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                onUpdate={() => setSelectedUser(user)}
                onDelete={async () => deleteUser(user.id)}
              />
            ))}
        </Grid>
      </WaitForLoad>
      {!!selectedUser && (
        <UserDialog
          open={!!selectedUser}
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSubmit={async (changes) => {
            await updateUser(selectedUser.id, changes)
            setSelectedUser(null)
          }}
        />
      )}
    </>
  )
}

export default UsersList
