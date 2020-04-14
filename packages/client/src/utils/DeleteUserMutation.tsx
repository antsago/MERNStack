import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      givenName
      familyName
      email
      created
    }
  }
`

export default () => {
  const [deleteUser] = useMutation(DELETE_USER)

  return (id: string) => deleteUser({ variables: { id } })
}
