import React, { useState } from "react"
import { Add, PlusOne } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { UserDialog } from "../../users"
import {
  useCreateRandomUser,
  useCreateUser,
  useIncrement,
} from "../../../utils"

export const Menu = () => {
  const createUser = useCreateUser()
  // const createRandomUser = useCreateRandomUser()
  const increment = useIncrement()

  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => setShowDialog(true)}
        aria-label="Add user"
      >
        <Add />
      </IconButton>
      <IconButton
        color="inherit"
        edge="end"
        // onClick={createRandomUser}
        onClick={increment}
        aria-label="Add random user"
      >
        <PlusOne />
      </IconButton>
      {showDialog && (
        <UserDialog
          user={{}}
          onClose={() => setShowDialog(false)}
          onSubmit={(newUser) => {
            createUser(newUser)
            setShowDialog(false)
          }}
          open
        />
      )}
    </>
  )
}

export default Menu
