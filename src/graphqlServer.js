const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

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

const fakeDatabase = {};

const resolvers = {
  user: ({ id }) => {
    if (!fakeDatabase[id]) {
      throw new Error(`no users exists with id ${id}`);
    }
    return { id, ...fakeDatabase[id] };
  },
  createUser: ({ user }) => {
    const id = require('crypto').randomBytes(10).toString('hex');

    fakeDatabase[id] = user;
    return { id, ...fakeDatabase[id] };
  },
  updateUser: ({ id, user }) => {
    if (!fakeDatabase[id]) {
      throw new Error(`no users exists with id ${id}`);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = user;
    return { id, ...fakeDatabase[id] };
  },
  deleteUser: ({ id }) => {
    if (!fakeDatabase[id]) {
      throw new Error(`no users exists with id ${id}`);
    }
    const user = fakeDatabase[id];
    fakeDatabase[id] = undefined;
    return { id, ...user };
  }
};

module.exports = graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true, // disable in production
});
