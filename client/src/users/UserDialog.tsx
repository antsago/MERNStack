import React from 'react'
import {
  Dialog,
  DialogTitle,
} from '@material-ui/core'

const UserItem = ({ open, title, onClose }: { open: boolean, title: string, onClose?: () => void }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
    </Dialog>
  )
}

export default UserItem
