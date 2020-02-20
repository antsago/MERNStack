const PROD = {
  port: 4000,
  dbUrl: 'mongodb://mongo:27017/graphql',
};

const DEV = {
  port: 4000,
  dbUrl: 'mongodb://localhost:27017/graphql',
};

const TEST = {
  port: 4100,
  dbUrl: 'mongodb://localhost:27017/test',
}

if (process.env.NODE_ENV === 'test') {
  module.exports = TEST;
} else if (process.env.NODE_ENV === 'dev') {
  module.exports = DEV;
} else {
  module.exports = PROD;
}