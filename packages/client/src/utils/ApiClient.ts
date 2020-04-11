import axios, { AxiosStatic } from "axios"
import { User, UserInput, UsersResolver } from "@mernstack/shared"
import config from "./config"

export default class ApiClient implements UsersResolver {
  constructor(
    private urlFromServer: string = config.apiFromServer,
    private urlFromClient: string = config.apiFromClient,
    private fetcher: AxiosStatic = axios,
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async makeQuery(query, variables?): Promise<any> {
    const url =
      typeof window === "undefined" ? this.urlFromServer : this.urlFromClient
    const response = await this.fetcher.post(url, { query, variables })
    return response.data.data
  }

  async createUser(user: UserInput): Promise<User> {
    const response = await this.makeQuery(
      "mutation createUser($user: UserInput!) { createUser(user: $user){ id, givenName, familyName, email, created } }",
      { user },
    )
    return response.createUser
  }

  async user(): Promise<User> {
    const response = await this.makeQuery(
      "{ user{ id, givenName, familyName, email, created } }",
    )
    return response.users
  }

  async users(): Promise<User[]> {
    const response = await this.makeQuery(
      "{ users{ id, givenName, familyName, email, created } }",
    )
    return response.users
  }

  async updateUser(id: string, user: UserInput): Promise<User> {
    const response = await this.makeQuery(
      "mutation updateUser($id: String!, $user: UserInput!) { updateUser(id: $id, user: $user){ id, givenName, familyName, email, created } }",
      { id, user },
    )
    return response.updateUser
  }

  async deleteUser(id: string): Promise<User> {
    const response = await this.makeQuery(
      "mutation deleteUser($id: String!) { deleteUser(id: $id){ id, givenName, familyName, email, created } }",
      { id },
    )
    return response.deleteUser
  }
}
