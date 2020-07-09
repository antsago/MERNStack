import { UserInput, User } from "@mernstack/shared"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_USERS } from "./GetUsers"

export const UPDATE_USER = gql`
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
  return async (id: string, changes: UserInput) => {
    await updateUser({
      variables: { id, user: changes },
      update: (cache, { data: { updateUser: updatedUser } }) => {
        const { users } = cache.readQuery({ query: GET_USERS })

        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: users.map((user) =>
              user.id === updatedUser.id ? updatedUser : user,
            ),
          },
        })
      },
    })
  }
}
