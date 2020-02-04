const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { getUser, createUser, updateUser, deleteUser } = require('./userRepository');

const schema = buildSchema(`  
  type User {
    id: ID!
    email: String
    givenName: String
    familyName: String
  }

  input UserInput {
    email: String
    givenName: String
    familyName: String
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    createUser(user: UserInput): User
    updateUser(id: ID!, user: UserInput): User
    deleteUser(id: ID!): User
  }
`);

const resolvers = {
  user: getUser,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true, // disable in production
});
