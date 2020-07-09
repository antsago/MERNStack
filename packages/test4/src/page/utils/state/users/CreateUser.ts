import { UserInput, User } from "@mernstack/shared"
import gql from "graphql-tag"
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
  const [createUser] = useMutation<{ createUser: User }, { user: UserInput }>(
    CREATE_USER,
  )
  return async (user: UserInput) => {
    await createUser({
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
}
