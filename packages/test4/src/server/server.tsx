import express from "express"
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../page/App'

function main() {
  const app = express();
  const port = 8080;

  const pageDirectory = process.env.NODE_ENV === "development" ?
    path.resolve(__dirname, '..', '..', 'dist', 'page')
    : path.resolve(__dirname, '..', 'page')
  app.use("/distribution", express.static(pageDirectory));

  app.get("/*", (req, res) => {
    const renderedApp = ReactDOMServer.renderToString(<App name="server" />);
    const indexFile = path.resolve(pageDirectory, 'index.html')

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
