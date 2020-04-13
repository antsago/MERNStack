import React from "react"
import { connect } from "react-redux"
import { Layout, UsersList } from "../components"
import { updateUser, deleteUser } from "../utils"

interface Props {
  changeUser: () => void
  removeUser: () => void
}

export const Index = ({ changeUser, removeUser }: Props) => (
  <Layout>
    <UsersList updateUser={changeUser} deleteUser={removeUser} />
  </Layout>
)

const mapDispatchToProps = (dispatch) => ({
  changeUser: (id, user) => dispatch(updateUser(id, user)),
  removeUser: (id) => dispatch(deleteUser(id)),
})

export default connect(null, mapDispatchToProps)(Index)
