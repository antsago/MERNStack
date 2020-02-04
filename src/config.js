const isTest = process.env.NODE_ENV === 'test';
module.exports = isTest ? {
  port: 4100,
  dbUrl: 'mongodb://localhost:27017/test',
}
: {
  port: 4000,
  dbUrl: 'mongodb://localhost:27017/graphql',
}