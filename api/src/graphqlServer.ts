import "reflect-metadata" // necessary for type-graphql
import graphqlHTTP, { Middleware } from "express-graphql"
import { buildSchema } from "type-graphql"
import UsersResolver from "./users"

export default async function startQraphlServer(): Promise<Middleware> {
  const schema = await buildSchema({
    resolvers: [UsersResolver],
    // We are not using type-graphql for validation, and it gives a warning without it
    validate: false,
  })

  return graphqlHTTP({
    schema,
    graphiql: true, // disable in production/with a built client
  })
}
