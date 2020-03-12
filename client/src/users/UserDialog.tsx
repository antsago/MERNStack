import React from 'react'
import {
  Dialog,
  DialogTitle,
} from '@material-ui/core'

const UserItem = ({ open, title }: { open: boolean, title: string }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
    </Dialog>
  )
}

export default UserItem
