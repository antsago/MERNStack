import { AxiosStatic } from 'axios'
import ApiClient from './ApiClient'

describe('ApiClient', () => {
  test('MakeQuery', async () => {
    const mockAxios = {
      post: jest.fn()
    }

    const query = 'grapqhQl'
    const graphQlPayload = 'Graphql data'
    const url = 'serverUrl'

    mockAxios.post.mockResolvedValue({ data: { data: graphQlPayload } })

    const client = new ApiClient(url, (mockAxios as any) as AxiosStatic)
    const response = await client.makeQuery(query)

    expect(response).toEqual(graphQlPayload)
    expect(mockAxios.post).toHaveBeenCalledWith(url, { query })
  })
})
