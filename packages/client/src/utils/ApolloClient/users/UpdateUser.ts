import { UserInput } from "@mernstack/shared"
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
  const [updateUser] = useMutation(UPDATE_USER)
  return (id: string, user: UserInput) =>
    updateUser({ variables: { id, user } })
}
