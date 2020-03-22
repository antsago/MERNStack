import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import createGraphqlServer from "./graphqlServer"
import config from "./config"

export default async function main() {
  await mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })

  const app = express()
    .use(
      cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      }),
    )
    .use("/", await createGraphqlServer())

  const httpServer = app.listen(config.port)
  console.log(
    `Running a GraphQL API server at http://localhost:${config.port}/`,
  )

  return httpServer
}

main()
