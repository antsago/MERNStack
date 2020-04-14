import React from "react"
import withApollo from "next-with-apollo"
import ApolloClient, { InMemoryCache, gql } from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { NextPage } from "next"
import config from "../config"

const GET_COUNTER = gql`
  query GetCounterValue {
    counter @client
  }
`

function getCache(restoredState) {
  const cache = new InMemoryCache().restore(restoredState || {})

  if (!restoredState) {
    cache.writeData({ data: { counter: 0 } })
  }

  return cache
}

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri:
        typeof window === "undefined"
          ? config.apiFromServer
          : config.apiFromClient,
      cache: getCache(initialState),
      resolvers: {
        Mutation: {
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
        },
      },
    }),
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: ({ Page, props }: { Page: NextPage; props: any }) => (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    ),
  },
)
