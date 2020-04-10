import { AxiosStatic } from "axios"
import ApiClient from "./ApiClient"

describe("ApiClient", () => {
  test("Make query", async () => {
    const mockAxios = { post: jest.fn() }

    const query = "grapqhQl"
    const variables = { foo: "foo" }
    const graphQlPayload = "Graphql data"
    const url = "serverUrl"

    mockAxios.post.mockResolvedValue({ data: { data: graphQlPayload } })

    const client = new ApiClient(
      url,
      url,
      (mockAxios as unknown) as AxiosStatic,
    )
    const response = await client.makeQuery(query, variables)

    expect(response).toEqual(graphQlPayload)
    expect(mockAxios.post).toHaveBeenCalledWith(url, { query, variables })
  })

  test("Create user", async () => {
    const mockAxios = { post: jest.fn() }

    const newUser = { givenName: "name" }
    const url = "serverUrl"

    mockAxios.post.mockResolvedValue({
      data: { data: { createUser: newUser } },
    })

    const client = new ApiClient(
      url,
      url,
      (mockAxios as unknown) as AxiosStatic,
    )
    const response = await client.createUser(newUser)

    expect(response).toEqual(newUser)
  })

  test("Load users", async () => {
    const mockAxios = { post: jest.fn() }

    const users = [
      { id: "test", givenName: "name", created: "2020-02-20T11:37:16.423Z" },
    ]
    const url = "serverUrl"

    mockAxios.post.mockResolvedValue({ data: { data: { users } } })

    const client = new ApiClient(
      url,
      url,
      (mockAxios as unknown) as AxiosStatic,
    )
    const response = await client.users()

    expect(response).toEqual(users)
  })

  test("Update user", async () => {
    const mockAxios = { post: jest.fn() }

    const id = "test"
    const userChange = { givenName: "name" }
    const url = "serverUrl"
    const responseUser = { id, ...userChange }

    mockAxios.post.mockResolvedValue({
      data: { data: { updateUser: responseUser } },
    })

    const client = new ApiClient(
      url,
      url,
      (mockAxios as unknown) as AxiosStatic,
    )
    const response = await client.updateUser(id, userChange)

    expect(response).toEqual(responseUser)
  })

  test("Delete user", async () => {
    const mockAxios = { post: jest.fn() }

    const id = "test"
    const responseUser = { id, givenName: "name" }
    const url = "serverUrl"

    mockAxios.post.mockResolvedValue({
      data: { data: { deleteUser: responseUser } },
    })

    const client = new ApiClient(
      url,
      url,
      (mockAxios as unknown) as AxiosStatic,
    )
    const response = await client.deleteUser(id)

    expect(response).toEqual(responseUser)
  })
})
