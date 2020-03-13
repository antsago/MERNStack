# MERN Stack

Reference setup for a dockerize microservice app using typescript and the MERN stack.

To try it just run `docker-compose up` and play with the React client at http://localhost:3000/ or with the graphiql client at http://localhost:4000/. Check the tests for examples on the queries that can be made to the api.

## Microservice description

It consists of two microservices:

- api: a GraphQL server with Docker and Mongo.
- client: an SSR PWA build with React, Redux-Saga and Material-UI and served with Next.js
- (and a default mongo image for persitency)

Each microservice follows these conventions:

- The code is contained within the src folder
- `npm run dev` for easy development (e.g. nodemon-like)
- `npm run test` to execute the tests (done with jest)
- `npm run format` to use prettier-standard to format and lint the code

## Potential next steps

- Integration tests: current tests are mostly unit tests, which don't give that much security. Especially in such a bare bones application
- E2E tests: for extra confidence (with cypress?)
- Move to prettier and es-lint from prettier-standard, as the former has more widespread support and provides more flexibility
- Logging
