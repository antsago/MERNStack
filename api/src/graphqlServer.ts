import "reflect-metadata" // necessary for type-graphql
import graphqlHTTP from "express-graphql"
import { buildSchema } from "type-graphql"
import { UsersResolver } from "./users"

export default async function startQraphlServer() {
  const schema = await buildSchema({
    resolvers: [UsersResolver],
    validate: false, // We are not using type-graphql for validation, and it gives a warning without it
  })

  return graphqlHTTP({
    schema,
    graphiql: true, // disable in production/with a built client
  })
}
