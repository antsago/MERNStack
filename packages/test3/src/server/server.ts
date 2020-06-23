import path from 'path'
import express from "express"

async function servePage(pageFolder) {
  const indexPath = path.resolve(pageFolder, 'index.html')

  if (process.env.NODE_ENV === "development") {
    const Bundler = (await import('parcel-bundler')).default

    const bundler = new Bundler(indexPath);
    return bundler.middleware();
  }

  return (req, res) => res.sendFile(indexPath)
}

async function main() {
  const pageFolder = path.resolve(__dirname, '..', 'page')
  const app = express()

  app.use('/dist/page', express.static(pageFolder))
  app.use(await servePage(pageFolder))
  app.listen(3000)
}

main()