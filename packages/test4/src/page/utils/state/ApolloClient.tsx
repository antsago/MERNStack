import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import fetch from "isomorphic-unfetch"
import config from "../config"
import alertMutations from "./alerts"

function getCache(isServer: boolean): InMemoryCache {
  if (!isServer) {
    return new InMemoryCache().restore(window.__APOLLO_STATE__)
  }

  const cache = new InMemoryCache()
  cache.writeData({ data: { alerts: [] } })
  return cache
}

const resolvers = { Mutation: alertMutations }

export default (isServer: boolean) => {
  const cache = new InMemoryCache()
  cache.writeData({ data: { alerts: [] } })

  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: isServer ? config.apiFromServer : config.apiFromClient,
      fetch,
    }),
    resolvers,
    cache: getCache(isServer),
  })
}