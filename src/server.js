const express = require('express');
const graphqlServer = require('./graphqlServer');

const app = express();
app.use('/', graphqlServer);

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/');