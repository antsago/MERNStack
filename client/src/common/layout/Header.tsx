import React from 'react'
import { Group as UsersIcon, Add, PlusOne } from '@material-ui/icons'
import { AppBar, Toolbar, Typography, makeStyles, createStyles, IconButton } from '@material-ui/core'

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
        <IconButton color="inherit"><Add /></IconButton>
        <IconButton color="inherit"><PlusOne /></IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
