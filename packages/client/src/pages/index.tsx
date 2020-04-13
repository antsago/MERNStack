import React from "react"
import { connect } from "react-redux"
import { Layout, UsersList } from "../components"
import { deleteUser } from "../utils"

interface Props {
  removeUser: () => void
}

export const Index = ({ removeUser }: Props) => (
  <Layout>
    <UsersList deleteUser={removeUser} />
  </Layout>
)

const mapDispatchToProps = (dispatch) => ({
  removeUser: (id) => dispatch(deleteUser(id)),
})

export default connect(null, mapDispatchToProps)(Index)
