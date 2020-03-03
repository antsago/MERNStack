import React, { useEffect, Component } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux'
import { Layout } from '../common';
import { withApollo, loadUsers, users, areUsersLoading } from '../utils';
import { UsersList } from '../users';

const Index = (props) => (
  <Layout>
    <UsersList
      users={props.users}
      isLoading={props.areUsersLoaded}
    />
  </Layout>
);

Index.getInitialProps = async (props) => {
  props.ctx.store.dispatch(loadUsers())
}

const mapStateToProps = ( state ) => ( {
  areUsersLoaded: areUsersLoading(state),
  users: users(state),
} );

export default connect(mapStateToProps)(Index);
