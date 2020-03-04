const env = process.env.NODE_ENV || 'production';

const production = {
  env: 'production',
  port: 4000,
  dbUrl: 'mongodb://mongo:27017/graphql',
};

const development = {
  env: 'development',
  port: 4000,
  dbUrl: 'mongodb://localhost:27017/graphql',
};

const test = {
  env: 'test',
  port: 4100,
  dbUrl: 'mongodb://localhost:27017/test',
}

const config = {
  production,
  development,
  test
};

module.exports = config[env];
