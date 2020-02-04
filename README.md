# graphql-test
Repository to try graphql in a non-trivial environment.
This repositories showcases a way of using graphql with
Docker, Mongo and endToEnd tests using Jest and axios.

To try it just run 'docker-compose up' and play with
the graphiql client at 'localhost:4000'. Check the tests
for examples on the queries that can be made.

To execute the tests run 'npm run test'

For easy development (e.g. nodemon and debugger) try 'npm run dev'.

Both the test and dev command start a mongo container in detach mode,
in order to stop it use 'docker-compose stop' at the end of
the development session.