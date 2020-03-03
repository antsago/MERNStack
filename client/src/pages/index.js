import React, { useEffect, Component } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux'
import { Layout } from '../common';
import { withApollo, loadUsers, users, areUsersLoading } from '../utils';
import { UsersList } from '../users';

const QUERY = gql`
  {
    users{id, givenName, familyName, email, created}
  }
`;

const Index = () => (
  <Layout>
    <UsersList
      users={this.props.users}
      isLoading={this.props.areUsersLoaded}
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
