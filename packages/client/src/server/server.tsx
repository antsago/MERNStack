import express from "express"
import fs from "fs"
import path from "path"
import React from "react"
import { ServerStyleSheets } from "@material-ui/core"
import { renderToStringWithData } from "@apollo/react-ssr"
import App from "../page/App"
import { createApolloClient } from "../page/utils"
import config from "./config"

async function getStaticAssets(distDirectory) {
  if (process.env.NODE_ENV === "development") {
    const webpack = (await import("webpack")).default
    const middleware = (await import("webpack-dev-middleware")).default
    const webpackConfig = (await import("../../webpack.page.config")).default

    const compiler = webpack(webpackConfig({ isProd: false }))
    return middleware(compiler, { publicPath: "/", index: false })
  }
  return express.static(distDirectory)
}

function renderPage(distDirectory) {
  return async (req, res) => {
    const client = createApolloClient(config.api, true)
    const sheets = new ServerStyleSheets()
    const htmlApp = await renderToStringWithData(
      sheets.collect(<App client={client} />),
    )
    const css = sheets.toString()
    const state = JSON.stringify(client.extract()).replace(/</g, "\\u003c")

    const renderedPage = fs
      .readFileSync(path.resolve(distDirectory, "index.html"), "utf8")
      .replace('<div id="app"></div>', `<div id="app">${htmlApp}</div>`)
      .replace(
        '<style id="jss-server-side"></style>',
        `<style id="jss-server-side">${css}</style>`,
      )
      .replace(
        '<script id="apollo-state"></script>',
        `<script id="apollo-state">window.__APOLLO_STATE__ = ${state}</script>`,
      )

    res.send(renderedPage)
  }
}

async function main() {
  const app = express()

  const distDirectory =
    process.env.NODE_ENV === "development"
      ? path.resolve(__dirname, "..", "..", "dist", "page")
      : path.resolve(__dirname, "..", "page")

  app.use("/", await getStaticAssets(distDirectory))

  app.get("/*", renderPage(distDirectory))

  const server = app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`)
  })
}

main()
