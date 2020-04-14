import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { GET_COUNTER } from "./GetCounter"

const UPDATE_COUNTER = gql`
  mutation updateCounter($offset: Number!) {
    updateCounter(offset: $offset) @client
  }
`

export const resolver = {
  updateCounter: (_, variables, { cache }) => {
    // query existing data
    const data = cache.readQuery({ query: GET_COUNTER })
    // Calculate new counter value
    const newCounterValue = data.counter + variables.offset
    cache.writeData({
      data: { counter: newCounterValue },
    })
    return null // best practices
  },
}

export default () => {
  const [increment] = useMutation(UPDATE_COUNTER, { variables: { offset: 1 } })
  return () => increment()
}
