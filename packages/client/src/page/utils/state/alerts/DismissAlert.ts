import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { GET_ALERTS } from "./GetAlerts"

const DISMISS_ALERT = gql`
  mutation dismissAlert($id: Number!) {
    dismissAlert(id: $id) @client
  }
`

export const resolver = {
  dismissAlert: (_, { id }, { cache }) => {
    const data = cache.readQuery({ query: GET_ALERTS })

    cache.writeQuery({
      query: GET_ALERTS,
      data: {
        alerts: data.alerts.filter((alert) => alert.id !== id),
      },
    })

    return null // best practices
  },
}

export default () => {
  const [dismissAlert] = useMutation<{}, { id: number }>(DISMISS_ALERT)
  return async (id: number) => {
    await dismissAlert({ variables: { id } })
  }
}
