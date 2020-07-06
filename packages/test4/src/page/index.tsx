import React from 'react';
import ReactDOM from "react-dom";
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { createHttpLink } from 'apollo-link-http'
import App from './App';

declare global {
  interface Window {
    __APOLLO_STATE__: NormalizedCacheObject;
  }
}

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
  }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})

const mountNode = document.getElementById("app")
ReactDOM.hydrate(<App client={client}/>, mountNode)

if (process.env.NODE_ENV === "production" && 'serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js');
  });
}
