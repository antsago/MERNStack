import express from "express"
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
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

async function main() {
  const app = express();
  const port = 8080;

  const isDevelopment = process.env.NODE_ENV === "development"
  const distDirectory = isDevelopment ? path.resolve(__dirname, '..', '..', 'dist', 'page') : path.resolve(__dirname, '..', 'page')
  
  // the prefix should be the same as webpackConfig.output.publicPath
  app.use("/static", await getStaticAssets(isDevelopment, distDirectory))
  
  app.get("/*", (req, res) => {
    const renderedApp = ReactDOMServer.renderToString(<App name="server" />);
    const indexFile = path.resolve(distDirectory, 'index.html')

    const htmlTemplate = fs.readFileSync(indexFile, 'utf8')
  
    return res.send(
      htmlTemplate.replace('<div id="app"></div>', `<div id="app">${renderedApp}</div>`)
    )
  })

  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

main();
