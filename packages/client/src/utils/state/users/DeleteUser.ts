import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import { GET_USERS } from "./GetUsers"

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`

export default () => {
  const [deleteUser] = useMutation<
    { deleteUser: { id: string } },
    { id: string }
  >(DELETE_USER)

  return async (id: string) => {
    await deleteUser({
      variables: { id },
      update: (cache, { data: { deleteUser: deletedUser } }) => {
        const { users } = cache.readQuery({ query: GET_USERS })

        cache.writeQuery({
          query: GET_USERS,
          data: { users: users.filter((user) => user.id !== deletedUser.id) },
        })
      },
    })
  }
}
