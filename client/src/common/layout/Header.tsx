import React from 'react';
import { Group as UsersIcon } from '@material-ui/icons';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
      <AppBar position="relative">
        <Toolbar>
          <UsersIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Users
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

export default Header;