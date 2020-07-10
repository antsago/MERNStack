import React, { useState } from "react"
import { Add, PlusOne } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"
import { UserDialog } from "../../users"
import { useCreateRandomUser, useCreateUser } from "../../../utils"

export const Menu = () => {
  const createUser = useCreateUser()
  const createRandomUser = useCreateRandomUser()

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
        onClick={createRandomUser}
        aria-label="Add random user"
      >
        <PlusOne />
      </IconButton>
      {showDialog && (
        <UserDialog
          user={{}}
          onClose={() => setShowDialog(false)}
          onSubmit={async (newUser) => {
            await createUser(newUser)
            setShowDialog(false)
          }}
          open
        />
      )}
    </>
  )
}

export default Menu
