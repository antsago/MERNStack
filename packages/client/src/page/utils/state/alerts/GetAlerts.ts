import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { Alert } from "../../types"

export const GET_ALERTS = gql`
  {
    alerts @client
  }
`

const useGetAlerts = (queryHook = useQuery) => {
  const { data } = queryHook<{ alerts: Alert[] }>(GET_ALERTS)

  return data ? data.alerts : []
}

export default (queryHook = useQuery) => {
  const alerts = useGetAlerts(queryHook)

  return alerts.length > 0 ? alerts[0] : undefined
}
