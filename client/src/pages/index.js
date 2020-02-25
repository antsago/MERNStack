import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux'
import { Layout } from '../common';
import { withApollo, loadUsers, usersLoaded } from '../utils';
import { UsersList } from '../users';

const QUERY = gql`
  {
    users{id, givenName, familyName, email, created}
  }
`;

const Index = props => {
  // const { data, loading } = useQuery(QUERY);

  console.log(props.usersLoaded);
  return (
    <Layout>
      <UsersList
        // users={data && data.users}
        // isLoading={loading}
        users={[]}
        isLoading={true}
      />
    </Layout>
  );
}

const mapStateToProps = ( state ) => ( {
  usersLoaded: usersLoaded(state),
} );

const mapActionsToProps = {
  loadUsers,
}

export default connect(mapStateToProps, mapActionsToProps)(Index);
