import React from "react"
import { connect } from "react-redux"
import { User } from "@djogger/shared"
import { Layout, UsersList } from "../components"
import {
  loadUsers,
  updateUser,
  deleteUser,
  usersSelector,
  areUsersLoading,
  Context,
} from "../utils"

export const Index = ({
  users,
  usersLoading,
  changeUser,
  removeUser,
}: {
  users: User[]
  usersLoading: boolean
  changeUser: () => void
  removeUser: () => void
}) => (
  <Layout>
    <UsersList
      users={users}
      isLoading={usersLoading}
      updateUser={changeUser}
      deleteUser={removeUser}
    />
  </Layout>
)

Index.getInitialProps = ({ ctx }: { ctx: Context }) => {
  ctx.store.dispatch(loadUsers())
}

const mapStateToProps = (state) => ({
  usersLoading: areUsersLoading(state),
  users: usersSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  changeUser: (id, user) => dispatch(updateUser(id, user)),
  removeUser: (id) => dispatch(deleteUser(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
