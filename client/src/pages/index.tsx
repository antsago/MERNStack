import React from 'react'
import { connect } from 'react-redux'
import { Layout } from '../common'
import { loadUsers, users, areUsersLoading } from '../utils'
import { UsersList } from '../users'

const Index = props => (
  <Layout>
    <UsersList users={props.users} isLoading={props.areUsersLoaded} />
  </Layout>
)

Index.getInitialProps = async props => {
  props.ctx.store.dispatch(loadUsers())
}

const mapStateToProps = state => ({
  areUsersLoaded: areUsersLoading(state),
  users: users(state)
})

export default connect(mapStateToProps)(Index)
