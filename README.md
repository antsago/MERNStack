Reference setup for a dockerize microservice app using typescript and the MERN stack.

It consists of two microservices:

- api: a GraphQL server with Docker and Mongo.
- client: an SSR React app using Redux-saga and Material-UI and served with Next.js
- (mongo: a default mongo image for persitency)

To try it just run 'docker-compose up' and play
with the React client at 'http://localhost:3000/' or with
the graphiql client at 'http://localhost:4000/'. Check the tests
for examples on the queries that can be made to the api.

Each microservice follows these conventions:

- The code is contained within the src folder
- 'npm run dev' to For easy development (e.g. nodemon or breakpoints)
- 'npm run test' to execute the tests (done with jest)
- 'npm run format' to use prettier-standard to format and lint the code

Potential next steps:

- Progressive Web App: as recommended by google (https://developers.google.com/web/ilt/pwa/why-build-pwa)
- Integration tests: current tests are mostly unit tests, which don't give that much security. Especially in such a bare bones application
- E2E tests: for extra confidence (with cypress?)
- Better error handling
