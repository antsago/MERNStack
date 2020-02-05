const express = require('express');
const mongoose = require('mongoose');
const graphqlServer = require('./graphqlServer');
const { port, dbUrl } = require('./config');

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();
app.use('/graphql', graphqlServer);

const httpServer = app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);

module.exports = httpServer;