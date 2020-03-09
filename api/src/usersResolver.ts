import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { User, UserInput } from './userTypes'
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsers
} from './userRepository'

@Resolver()
export default class UsersResolver {
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
