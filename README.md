# graphql-test
Repository to showcase a setup with modern technologies integrated together.

This repositories showcases three microservices:
  - mongo: default mongo image used as persistent storage
  - api: a GraphQL server with Docker, and EndToEnd tests using Jest and Axios.
  - client: an SSR React app using ApolloClient and Material-UI and served with Next.js

To try it just run 'docker-compose up' and play
with the React client at 'http://localhost:3000/' or with 
the graphiql client at 'http://localhost:4000/'. Check the tests
for examples on the queries that can be made to the api.

To execute the tests run 'npm run test'

For easy development (e.g. nodemon or breakpoints) try 'npm run dev'.

Both the test and dev command start the dependent containers in detach mode,
in order to stop it use 'docker-compose stop' at the end of
the development session.