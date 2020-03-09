import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'type-graphql'
import UsersResolver from './usersResolver'

export default async function startQraphlServer () {
  const schema = await buildSchema({
    resolvers: [UsersResolver]
  })

  return graphqlHTTP({
    schema,
    graphiql: true // disable in production/with a built client
  })
}
