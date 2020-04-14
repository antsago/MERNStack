import { UserInput } from "@mernstack/shared"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import { GET_USERS } from "./GetUsers"

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
  return (user: UserInput) =>
    createUser({
      variables: { user },
      update: (cache, { data: { createUser: newUser } }) => {
        const { users } = cache.readQuery({ query: GET_USERS })

        cache.writeQuery({
          query: GET_USERS,
          data: { users: [...users, newUser] },
        })
      },
    })
}
