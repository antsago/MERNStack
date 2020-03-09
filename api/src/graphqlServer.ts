import graphqlHTTP from 'express-graphql'
import {
  ObjectType,
  InputType,
  Field,
  Resolver,
  Query,
  Arg,
  Mutation,
  ID,
  buildSchema
} from 'type-graphql'
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsers
} from './userRepository'

@ObjectType()
class User {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  givenName?: string

  @Field({ nullable: true })
  familyName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  created?: Date
}

@InputType()
class UserInput implements Partial<User> {
  @Field({ nullable: true })
  givenName?: string

  @Field({ nullable: true })
  familyName?: string

  @Field({ nullable: true })
  email?: string
}

@Resolver()
class UsersResolver {
  @Query(() => User)
  async user (@Arg('id') id: string) {
    return getUser(id)
  }

  @Query(() => [User])
  async users () {
    return getUsers()
  }

  @Mutation(() => User)
  async createUser (@Arg('user') user: UserInput) {
    return createUser(user)
  }

  @Mutation(() => User)
  async updateUser (@Arg('id') id: string, @Arg('user') user: UserInput) {
    return updateUser(id, user)
  }

  @Mutation(() => User)
  async deleteUser (@Arg('id') id: string) {
    return deleteUser(id)
  }
}

export default async function startQraphlServer () {
  const schema = await buildSchema({
    resolvers: [UsersResolver]
  })

  return graphqlHTTP({
    schema,
    graphiql: true // disable in production/with a built client
  })
}
