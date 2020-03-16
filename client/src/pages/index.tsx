import React from 'react'
import { connect } from 'react-redux'
import { Layout, UsersList } from '../components'
import { loadUsers, updateUser, deleteUser, users, areUsersLoading, Context, User } from '../utils'

export const Index = ({
  users,
  usersLoading,
  updateUser,
  deleteUser
}: {
  users: User[]
  usersLoading: boolean
  updateUser: () => void
  deleteUser: () => void
}) => (
    <Layout>
      <UsersList
        users={users}
        isLoading={usersLoading}
        updateUser={updateUser}
        deleteUser={deleteUser}
      />
    </Layout>
  )

Index.getInitialProps = async ({ ctx }: { ctx: Context }) => {
  ctx.store.dispatch(loadUsers())
}

const mapStateToProps = state => ({
  usersLoading: areUsersLoading(state),
  users: users(state)
})

const mapDispatchToProps = dispatch => ({
  updateUser: (id, user) => dispatch(updateUser(id, user)),
  deleteUser: id => dispatch(deleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
