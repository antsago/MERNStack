# graphql-test
Repository to try GraphQL in a non-trivial environment.
This repositories showcases a way of using GraphQL with
Docker, Mongo and EndToEnd tests using Jest and Axios.

To try it just run 'docker-compose up' and play with
the graphiql client at 'http://localhost:4000/'. Check the tests
for examples on the queries that can be made.

To execute the tests run 'npm run test'

For easy development (e.g. nodemon or breakpoints) try 'npm run dev'.

Both the test and dev command start a mongo container in detach mode,
in order to stop it use 'docker-compose stop' at the end of
the development session.