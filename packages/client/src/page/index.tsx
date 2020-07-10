import type { NormalizedCacheObject } from "apollo-cache-inmemory"
import React from "react"
import ReactDOM from "react-dom"
import { createApolloClient } from "./utils"
import App from "./App"
import config from "./config"

declare global {
  interface Window {
    __APOLLO_STATE__: NormalizedCacheObject
  }
}

const client = createApolloClient(config.api, false)

const mountNode = document.getElementById("app")
ReactDOM.hydrate(<App client={client} />, mountNode)

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceWorker.js")
  })
}
