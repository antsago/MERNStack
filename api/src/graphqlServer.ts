import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import { getUser, createUser, updateUser, deleteUser, getUsers } from './userRepository';

const schema = buildSchema(`  
  type User {
    id: ID!
    email: String
    givenName: String
    familyName: String
    created: String
  }

  input UserInput {
    email: String
    givenName: String
    familyName: String
  }

  type Query {
    users: [User]
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
  users: getUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true, // disable in production/with a built client
});
