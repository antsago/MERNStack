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
    users{id, givenName, email, created}
  }
`;

const Index = () => {
  const { data, loading } = useQuery(QUERY);
  const classes = useStyles();

  return (
    <Layout>
      <CircularProgress className={classes.loader}/>
      {/* {loading || !data
        ? <CircularProgress />
        : <Grid container spacing={4}>
          {data.users.map(user => (
            <UserItem
              key={user.id}
              image="https://source.unsplash.com/random"
              heading="Heading"
              content="This is a media card. You can use this section to describe the content."
            />
          ))}
        </Grid>
      } */}
    </Layout>
  );
}

export default withApollo(Index);
