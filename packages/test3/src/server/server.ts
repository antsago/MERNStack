import path from 'path'
import express from "express"

async function main() {
  const pageFolder = path.resolve(__dirname, '..', 'page')
  const indexPath = path.resolve(pageFolder, 'index.html')
  const app = express()

  app.use('/dist/page', express.static(pageFolder))

  if (process.env.NODE_ENV === "production") {

    app.use((req, res) => {
      res.sendFile(indexPath);
    });
  } else {
    const Bundler = (await import('parcel-bundler')).default

    const bundler = new Bundler(indexPath);
    app.use(bundler.middleware());
  }

  app.listen(3000)
}

main()