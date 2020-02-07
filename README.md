# graphql-test
Repository to try GraphQL and Next.js in a non-trivial environment.

This repositories showcases three microservices:
  - mongo: default mongo image used as persistent storage
  - api: a GraphQL server with Docker, and EndToEnd tests using Jest and Axios.
  - client: a Next.js server that serves an isomorphic React client that consumes the api

To try it just run 'docker-compose up' and play
with the React client at 'http://localhost/' or with 
the graphiql client at 'http://localhost:4000/'. Check the tests
for examples on the queries that can be made to the api.

To execute the tests run 'npm run test'

For easy development (e.g. nodemon or breakpoints) try 'npm run dev'.

Both the test and dev command start the dependent containers in detach mode,
in order to stop it use 'docker-compose stop' at the end of
the development session.