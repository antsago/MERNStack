import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { withApollo, Layout } from '../common';
import { UsersList } from '../users';

const QUERY = gql`
  {
    users{id, givenName, familyName, email, created}
  }
`;

const Index = () => {
  const { data, loading } = useQuery(QUERY);

  return (
    <Layout>
      <UsersList
        users={data && data.users}
        isLoading={loading}
      />
    </Layout>
  );
}

export default withApollo(Index);
