import React, { useState } from "react"
import { Add, PlusOne } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { UserDialog } from "../../users"
import { useCreateRandomUser, useCreateUser } from "../../../utils"

const UPDATE_COUNTER = gql`
  mutation updateCounter($offset: Number!) {
    updateCounter(offset: $offset) @client
  }
`

export const Menu = () => {
  const createUser = useCreateUser()
  // const createRandomUser = useCreateRandomUser()
  const [increment] = useMutation(UPDATE_COUNTER, { variables: { offset: 1 } })

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
        onClick={() => {
          console.log("here")
          increment()
        }}
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
