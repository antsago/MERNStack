import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

export const GET_ALERTS = gql`
  {
    alerts @client
  }
`

export default () => {
  const { data } = useQuery(GET_ALERTS)

  return data.alerts
}
