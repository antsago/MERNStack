import { User, UserInput, UsersResolver } from "@mernstack/shared"
import ApolloClient, { gql } from "apollo-boost"
import fetch from "isomorphic-unfetch"
import config from "./config"

export default class ApiClient implements UsersResolver {
  constructor(
    private client = new ApolloClient({
      uri:
        typeof window === "undefined"
          ? config.apiFromServer
          : config.apiFromClient,
      fetch,
    }),
  ) {}

  async createUser(user: UserInput): Promise<User> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation createUser($user: UserInput!) {
          createUser(user: $user) {
            id
            givenName
            familyName
            email
            created
          }
        }
      `,
      variables: { user },
    })
    return response.data.createUser
  }

  async user(): Promise<User> {
    const response = await this.client.query({
      query: gql`
        {
          user {
            id
            givenName
            familyName
            email
            created
          }
        }
      `,
    })
    return response.data.user
  }

  async users(): Promise<User[]> {
    const response = await this.client.query({
      query: gql`
        {
          users {
            id
            givenName
            familyName
            email
            created
          }
        }
      `,
    })
    return response.data.users
  }

  async updateUser(id: string, user: UserInput): Promise<User> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation updateUser($id: String!, $user: UserInput!) {
          updateUser(id: $id, user: $user) {
            id
            givenName
            familyName
            email
            created
          }
        }
      `,
      variables: { id, user },
    })
    return response.data.updateUser
  }

  async deleteUser(id: string): Promise<User> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation deleteUser($id: String!) {
          deleteUser(id: $id) {
            id
            givenName
            familyName
            email
            created
          }
        }
      `,
      variables: { id },
    })
    return response.data.deleteUser
  }
}
