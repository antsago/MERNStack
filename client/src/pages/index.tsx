import React from 'react'
import { connect } from 'react-redux'
import { Layout } from '../common'
import { loadUsers, users, areUsersLoading, Context, User } from '../utils'
import { UsersList } from '../users'

export const Index = ({
  users,
  usersLoading
}: {
  users: User[]
  usersLoading: boolean
}) => (
    <Layout>
      <UsersList users={users} isLoading={usersLoading} />
    </Layout>
  )

Index.getInitialProps = async ({ ctx }: { ctx: Context }) => {
  ctx.store.dispatch(loadUsers())
}

const mapStateToProps = state => ({
  usersLoading: areUsersLoading(state),
  users: users(state)
})

export default connect(mapStateToProps)(Index)
