import express from "express"
import fs from 'fs'
import path from 'path'
import React from 'react'
import { ServerStyleSheets } from '@material-ui/core';
import { renderToStringWithData } from "@apollo/react-ssr";
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import App from '../page/App'

async function getStaticAssets(isDevelopment, distDirectory) {
  if (isDevelopment) {
    const webpack = (await import('webpack')).default
    const middleware = (await import('webpack-dev-middleware')).default
    const webpackConfig = (await import('../../webpack.page.config.js')).default

    const compiler = webpack(webpackConfig)
    return middleware(compiler, { publicPath: '/' })
  } else {
    return express.static(distDirectory)
  }
}

function renderPage(distDirectory) {
  return async (req, res) => {
    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: 'https://48p1r2roz4.sse.codesandbox.io',
        fetch,
      }),
      cache: new InMemoryCache(),
    })


    const sheets = new ServerStyleSheets()
    const htmlApp = await renderToStringWithData(sheets.collect(<App client={client} />))
    const css = sheets.toString()
    const state = JSON.stringify(client.extract()).replace(/</g, '\\u003c')

    const renderedPage = fs.readFileSync(path.resolve(distDirectory, 'index.html'), 'utf8')
      .replace('<div id="app"></div>', `<div id="app">${htmlApp}</div>`)
      .replace('<style id="jss-server-side"></style>', `<style id="jss-server-side">${css}</style>`)
      .replace('<script id="apollo-state"></script>', `<script id="apollo-state">window.__APOLLO_STATE__ = ${state}</script>`)
    
    res.send(renderedPage)
  }
}

async function main() {
  const app = express();
  const port = 8080;

  const isDevelopment = process.env.NODE_ENV === "development"
  const distDirectory = isDevelopment ? path.resolve(__dirname, '..', '..', 'dist', 'page') : path.resolve(__dirname, '..', 'page')
  
  // the prefix should be the same as webpackConfig.output.publicPath
  app.use("/static", await getStaticAssets(isDevelopment, distDirectory))
  
  app.get("/*", renderPage(distDirectory))

  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

main();
