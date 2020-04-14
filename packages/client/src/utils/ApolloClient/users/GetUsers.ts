import { User } from "@mernstack/shared"
import { gql } from "apollo-boost"
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

export default () => useQuery<{ users: User[] }>(GET_USERS)
