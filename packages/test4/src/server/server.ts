import path from 'path'
import express from "express"

function main() {
  const app = express();
  const port = 8080;

  const pageDirectory = path.resolve(__dirname, '..', 'page')
  app.use("/dist/page", express.static(pageDirectory));

  app.get("/*", (req, res) => {
    res.sendFile(`${pageDirectory}/index.html`)
  });

  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

main();
