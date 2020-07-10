interface Config {
  env: string
  api: string
}

const production: Config = {
  env: "production",
  api: "http://localhost:4000/",
}

const development: Config = {
  env: "development",
  api: "http://localhost:4000/",
}

const config: { [environment: string]: Config } = {
  production,
  development,
}

export default config[
  process.env.NODE_ENV === "production" ? "production" : "development"
]
