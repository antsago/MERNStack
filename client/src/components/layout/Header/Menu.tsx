import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Add, PlusOne } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { UserDialog } from '../../users'
import { UserInput, createUser, createRandomUser } from '../../../utils'

export const Menu = ({
  createUser,
  createRandomUser
}: {
  createUser: (UserInput) => void
  createRandomUser: () => void
}) => {
  const [showDialog, setShowDialog] = useState(false)
  return (
    <Fragment>
      <IconButton
        color='inherit'
        onClick={() => setShowDialog(true)}
        aria-label='Add user'
      >
        <Add />
      </IconButton>
      <IconButton
        color='inherit'
        edge='end'
        onClick={createRandomUser}
        aria-label='Add random user'
      >
        <PlusOne />
      </IconButton>
      {showDialog && (
        <UserDialog
          user={{}}
          onClose={() => setShowDialog(false)}
          onSubmit={newUser => {
            createUser(newUser)
            setShowDialog(false)
          }}
          open
        />
      )}
    </Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user)),
  createRandomUser: () => dispatch(createRandomUser())
})

export default connect(undefined, mapDispatchToProps)(Menu)
