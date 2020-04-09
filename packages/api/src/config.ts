const env = process.env.NODE_ENV || "production"

interface Config {
  env: string
  port: number
  dbUrl: string
}

const production: Config = {
  env: "production",
  port: 4000,
  dbUrl: "mongodb://mongo:27017/graphql",
}

const development: Config = {
  env: "development",
  port: 4000,
  dbUrl: "mongodb://localhost:27017/graphql",
}

const test: Config = {
  env: "test",
  port: 4100,
  dbUrl: "mongodb://localhost:27017/test",
}

const config: { [environment: string]: Config } = {
  production,
  development,
  test,
}

export default config[env]
