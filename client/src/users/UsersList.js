import React from 'react';
import { makeStyles, Grid, CircularProgress } from '@material-ui/core';
import UserItem from './UserItem';

const useStyles = makeStyles(theme => ({
  loader: {
    position: 'relative',
    left: '50%',
  },
}));

const UsersList = ({ users, isLoading }) => {
  const classes = useStyles();

  return isLoading || !users
    ? <CircularProgress className={classes.loader} />
    : (
      <Grid container spacing={4}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </Grid>
    );
}

export default UsersList;