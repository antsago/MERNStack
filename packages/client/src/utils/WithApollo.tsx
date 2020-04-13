import React from "react"
import withApollo from "next-with-apollo"
import ApolloClient, { InMemoryCache } from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { NextPage } from "next"
import config from "./config"

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri:
        typeof window === "undefined"
          ? config.apiFromServer
          : config.apiFromClient,
      cache: new InMemoryCache().restore(initialState || {}),
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
