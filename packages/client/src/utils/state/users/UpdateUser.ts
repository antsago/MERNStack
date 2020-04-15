import { UserInput, User } from "@mernstack/shared"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

const UPDATE_USER = gql`
  mutation updateUser($id: String!, $user: UserInput!) {
    updateUser(id: $id, user: $user) {
      id
      givenName
      familyName
      email
      created
    }
  }
`

export default () => {
  const [updateUser] = useMutation<
    { updateUser: User },
    { id: string; user: UserInput }
  >(UPDATE_USER)
  return async (id: string, user: UserInput) => {
    await updateUser({ variables: { id, user } })
  }
}
