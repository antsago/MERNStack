const express = require('express');
const mongoose = require('mongoose');
const graphqlServer = require('./graphqlServer');

mongoose.connect('mongodb://localhost:27017/graphql-test',  { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use('/', graphqlServer);

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/');