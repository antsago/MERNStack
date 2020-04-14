import { User } from "@mernstack/shared"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"

const USERS_QUERY = gql`
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

export default () => useQuery<{ users: User[] }>(USERS_QUERY)
