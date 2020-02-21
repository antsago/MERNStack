import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../withApollo';
import { makeStyles, Grid, CircularProgress } from '@material-ui/core';
import { Layout, UserItem } from '../components';

const useStyles = makeStyles(theme => ({
  loader: {
    position: 'relative',
    left: '50%',
  },
}));

const QUERY = gql`
  {
    users{id, givenName, familyName, email, created}
  }
`;

const Index = () => {
  const { data, loading } = useQuery(QUERY);
  const classes = useStyles();

  return (
    <Layout>
      {loading || !data
        ? <CircularProgress className={classes.loader} />
        : (
          <Grid container spacing={4}>
            {data.users.map(user => (
              <UserItem user={user} />
            ))}
          </Grid>
        )
      }
    </Layout>
  );
}

export default withApollo(Index);
