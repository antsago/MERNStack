import React, { Fragment } from 'react'
import { Add, PlusOne } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

const Menu = () => {
  return (
    <Fragment>
      <IconButton color="inherit"><Add /></IconButton>
      <IconButton color="inherit"><PlusOne /></IconButton>
    </Fragment>
  )
}

export default Menu
