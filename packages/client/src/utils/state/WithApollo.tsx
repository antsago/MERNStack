import React from "react"
import withApollo from "next-with-apollo"
import ApolloClient, { InMemoryCache } from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { NextPage } from "next"
import config from "../config"
import alertMutation from "./alerts"

export function getCache(restoredState?): InMemoryCache {
  const cache = new InMemoryCache().restore(restoredState || {})

  if (!restoredState) {
    cache.writeData({ data: { alerts: [] } })
  }

  return cache
}

export const resolvers = { Mutation: alertMutation }

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri:
        typeof window === "undefined"
          ? config.apiFromServer
          : config.apiFromClient,
      cache: getCache(initialState),
      resolvers,
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
