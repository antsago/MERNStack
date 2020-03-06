// Next auto-populates and rewrites NODE_ENV
const env = process.env.NODE_ENV

interface Config {
  env: string
  apiUrl: string
}

const production: Config = {
  env: 'production',
  apiUrl: 'http://api:4000/'
}

const development: Config = {
  env: 'development',
  apiUrl: 'http://localhost:4000/'
}

const config: { [environment: string]: Config } = {
  production,
  development
}

export default config[env]
