// Next auto-populates and rewrites NODE_ENV
const env = process.env.NODE_ENV;

const production = {
  env: 'production',
  apiUrl: 'http://api:4000/',
};

const development = {
  env: 'development',
  apiUrl: 'http://localhost:4000/',
};

const config = {
  production,
  development,
};

module.exports = config[env];
