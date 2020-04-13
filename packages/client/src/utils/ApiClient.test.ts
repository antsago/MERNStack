import ApolloClient from "apollo-boost"
import ApiClient from "./ApiClient"

function testClient() {
  return {
    query: jest.fn(),
    mutate: jest.fn(),
  }
}

describe("ApiClient", () => {
  test("Create user", async () => {
    const newUser = { givenName: "name" }
    const mockApollo = testClient()
    mockApollo.mutate.mockResolvedValue({ data: { createUser: newUser } })

    const client = new ApiClient(
      (mockApollo as unknown) as ApolloClient<unknown>,
    )
    const response = await client.createUser(newUser)

    expect(response).toEqual(newUser)
  })

  test("Load users", async () => {
    const users = [
      { id: "test", givenName: "name", created: "2020-02-20T11:37:16.423Z" },
    ]
    const mockApollo = testClient()
    mockApollo.query.mockResolvedValue({ data: { users } })

    const client = new ApiClient(
      (mockApollo as unknown) as ApolloClient<unknown>,
    )
    const response = await client.users()

    expect(response).toEqual(users)
  })

  test("Update user", async () => {
    const id = "test"
    const userChange = { givenName: "name" }
    const responseUser = { id, ...userChange }
    const mockApollo = testClient()
    mockApollo.mutate.mockResolvedValue({ data: { updateUser: responseUser } })

    const client = new ApiClient(
      (mockApollo as unknown) as ApolloClient<unknown>,
    )
    const response = await client.updateUser(id, userChange)

    expect(response).toEqual(responseUser)
  })

  test("Delete user", async () => {
    const id = "test"
    const responseUser = { id, givenName: "name" }
    const mockApollo = testClient()
    mockApollo.mutate.mockResolvedValue({ data: { deleteUser: responseUser } })

    const client = new ApiClient(
      (mockApollo as unknown) as ApolloClient<unknown>,
    )
    const response = await client.deleteUser(id)

    expect(response).toEqual(responseUser)
  })
})
