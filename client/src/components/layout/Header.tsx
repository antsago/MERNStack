import React from 'react'
import { Group as UsersIcon } from '@material-ui/icons'
import { AppBar, Toolbar, Typography, makeStyles, createStyles } from '@material-ui/core'
import Menu from './Menu'

const useStyles = makeStyles(theme => createStyles({
  icon: {
    marginRight: theme.spacing(2)
  },
  grow: {
    flexGrow: 1,
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position='relative'>
      <Toolbar>
        <UsersIcon className={classes.icon} />
        <Typography variant='h6' color='inherit' noWrap>
          UsersList
        </Typography>
        <div className={classes.grow} />
        <Menu />
      </Toolbar>
    </AppBar>
  )
}

export default Header
