import { Resolver, Query, Arg, Mutation } from "type-graphql"
import { UsersResolver as ResolverContract } from "@mernstack/shared"
import { User, UserInput } from "./schema"
import UserRepository from "./repository"

@Resolver()
export default class UsersResolver implements ResolverContract {
  constructor(private repository: UserRepository = new UserRepository()) { }

  @Query(() => User)
  async user(@Arg("id") id: string): Promise<User> {
    return this.repository.getUser(id)
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.repository.getUsers()
  }

  @Mutation(() => User)
  async createUser(@Arg("user") user: UserInput): Promise<User> {
    return this.repository.createUser(user)
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("user") user: UserInput,
  ): Promise<User> {
    return this.repository.updateUser(id, user)
  }

  @Mutation(() => User)
  async deleteUser(@Arg("id") id: string): Promise<User> {
    return this.repository.deleteUser(id)
  }
}
