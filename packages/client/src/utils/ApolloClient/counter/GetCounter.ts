import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

export const GET_COUNTER = gql`
  query GetCounterValue {
    counter @client
  }
`

export default () => {
  const { data } = useQuery(GET_COUNTER)

  return data.counter
}
