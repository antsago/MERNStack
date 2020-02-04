const isTest = process.env.NODE_ENV === 'test';
module.exports = {
  port: 4000,
  dbUrl: `mongodb://localhost:27017/${isTest ? 'test' : 'graphql'}`,
}