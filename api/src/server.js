const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const graphqlServer = require('./graphqlServer');
const { port, dbUrl } = require('./config');

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use('/', graphqlServer);

const httpServer = app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/`);

module.exports = httpServer;