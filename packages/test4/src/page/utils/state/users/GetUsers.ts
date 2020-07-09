import { User } from "@mernstack/shared"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

export const GET_USERS = gql`
  {
    users {
      id
      givenName
      familyName
      email
      created
    }
  }
`

export default () => {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS)

  return { loading, users: data && data.users }
}
