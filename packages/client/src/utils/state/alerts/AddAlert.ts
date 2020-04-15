import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Alert } from "../../types"
import { GET_ALERTS } from "./GetAlerts"

const ADD_ALERT = gql`
  mutation addAlert($message: String!) {
    addAlert(message: $message) @client
  }
`

export const resolver = {
  addAlert: (_, { message }, { cache }) => {
    const data = cache.readQuery({ query: GET_ALERTS })

    const newAlert: Alert = { id: Date.now(), message }

    cache.writeQuery({
      query: GET_ALERTS,
      data: {
        alerts: [...data.alerts, newAlert],
      },
    })

    return null // best practices
  },
}

export default () => {
  const [addAlert] = useMutation<{}, { message: string }>(ADD_ALERT)
  return async (message: string) => {
    await addAlert({ variables: { message } })
  }
}
