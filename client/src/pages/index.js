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

class Index extends React.Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    return (
      <Layout>
        <UsersList
          users={this.props.users}
          isLoading={this.props.areUsersLoaded}
        />
      </Layout>
    );
  }
}

const mapStateToProps = ( state ) => ( {
  areUsersLoaded: areUsersLoading(state),
  users: users(state),
} );

const mapActionsToProps = {
  loadUsers,
}

export default connect(mapStateToProps, mapActionsToProps)(Index);
