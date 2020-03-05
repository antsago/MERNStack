import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import graphqlServer from './graphqlServer';
import config from './config';

mongoose.connect(config.dbUrl, {
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

const httpServer = app.listen(config.port);
console.log(`Running a GraphQL API server at http://localhost:${config.port}/`);

export default httpServer;