import { UserInput } from "@mernstack/shared"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

export const CREATE_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      id
      givenName
      familyName
      email
      created
    }
  }
`

export default () => {
  const [createUser] = useMutation(CREATE_USER)
  return (user: UserInput) => createUser({ variables: { user } })
}
