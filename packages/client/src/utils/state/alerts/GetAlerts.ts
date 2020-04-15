import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

export const GET_ALERTS = gql`
  {
    alerts @client
  }
`

const useGetAlerts = () => {
  const { data } = useQuery(GET_ALERTS)

  return data ? data.alerts : []
}

export default () => {
  const alerts = useGetAlerts()

  return alerts.length > 0 ? alerts[0] : undefined
}
