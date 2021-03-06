# MERN Stack

Reference setup for a dockerize microservice app using typescript and the MERN stack.

To try it just run `docker-compose up` and play with the React client at http://localhost:3000/ or with the graphiql client at http://localhost:4000/.


## Microservices

This sample app consists of three services:

- api: a GraphQL server with Docker and Mongo.
- client: an SSR PWA build with React, Apollo and Material-UI
- mongo: for persitency


## File structure

At the high-level, the repository is divided into:

- services: where the dockerfiles and other service-related thing live.
- packages: where the packages that make up the different services live.


The app consists of three packages:

- share: which contains common coode and type definitions to ensure the integration
between the services.
- api: the code for the api service.
- client: the code for the client service.


When using the app, these are useful things to know:

- The code for each package is contained within the src folder.
- `npm run dev` for easy development of leave packages (e.g. nodemon-like).
- `npm run test` to execute the tests (done with jest).
- `npm run format` to use eslint and prettier to format and lint the code (only available at root).
- `npm run build` to create the production build (I recommend to use it at root).
- `npm start` to execute the build (you can see it in action in the Dockerfiles).


## Potential next steps

- Add a reverse proxy and enable ssl. Recommend setting chrome://flags/#allow-insecure-localhost to avoid warnings while developing. Need to run certbot ones before the other services.
- Deploy somewhere?
- E2E tests: business logic is covered by unit tests, typing (shared between services) goes
a long way to prevent integration errors. What is missing for full confidence are end to end
tests of the whole deployed application (with cypress and docker?).
- CI (Husky, Travis?) / CD: as another filter to prevent errors form creeping in.
- Logging / monitoring.
- Enable offline caching and appshell https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-i-introduction-50679aef2b12
- Enable strict mode for typescript
- Webpack production build requires raising node's memory limit, this is likely caused by typescript + webpack or a leak in one of the plugins.
- Reduce container size by bundling server dependencies with webpack (in both api and client).
  - That would also simplify the dockerfile
  - Tree shaking would be necessary to truly reduce size, and that requires ES5+, which is only supported by Node 14+
- Explore webcomponents for microfrontends: use fast https://fast.design/docs/fast-element/defining-elements? (they do not support react as of yet)
