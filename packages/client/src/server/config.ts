interface Config {
  env: string
  port: number
  api: string
}

const production: Config = {
  env: "production",
  port: 3000,
  api: "http://api:4000/",
}

const development: Config = {
  env: "development",
  port: 3000,
  api: "http://localhost:4000/",
}

const config: { [environment: string]: Config } = {
  production,
  development,
}

export default config[
  process.env.NODE_ENV === "production" ? "production" : "development"
]
