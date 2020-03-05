const axios = require('axios')
const { port } = require('../src/config')

const axiosInstance = axios.create({
  baseURL: `http://localhost:${port}/`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

const makeCall = async query => {
  const response = await axiosInstance.post('/', JSON.stringify({ query }))

  return response.data
}

describe('User CRUD', () => {
  test('List of users returns all users in database', async () => {
    const response = await makeCall(`
      {
        users{id, givenName, email, created}
      }
    `)

    expect(response.data.users).toEqual(
      expect.arrayContaining([
        {
          id: 'testing',
          givenName: 'Test',
          email: 'test@test.com',
          created: expect.any(String)
        }
      ])
    )
  })

  test('User can be created', async () => {
    const response = await makeCall(`
      mutation {
        createUser(user: { email: "foo@test.com" }){id, givenName, email, created}
      }
    `)

    expect(response.data.createUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        givenName: null,
        email: 'foo@test.com',
        created: expect.any(String)
      })
    )
  })

  test('User can be read', async () => {
    const response = await makeCall(`
      {
        user(id: "testing"){id, givenName, email, created}
      }
    `)

    expect(response.data.user).toEqual(
      expect.objectContaining({
        id: 'testing',
        givenName: 'Test',
        email: 'test@test.com',
        created: expect.any(String)
      })
    )
  })

  test('User can be updated', async () => {
    const response = await makeCall(`
      mutation {
        updateUser(id:"testing", user: { givenName: "Changed" }){id, givenName, email, created}
      }
    `)

    expect(response.data.updateUser).toEqual(
      expect.objectContaining({
        id: 'testing',
        givenName: 'Changed',
        email: 'test@test.com',
        created: expect.any(String)
      })
    )
  })

  test('User can be deleted', async () => {
    const response = await makeCall(`
      mutation {
        deleteUser(id:"testing"){id, givenName, email, created}
      }
    `)

    expect(response.data.deleteUser).toEqual(
      expect.objectContaining({
        id: 'testing',
        givenName: 'Changed',
        email: 'test@test.com',
        created: expect.any(String)
      })
    )
  })

  test('Deleted user is not found', async () => {
    const response = await makeCall(`
      {
        user(id: "testing"){id}
      }
    `)

    expect(response.data.user).toEqual(null)
  })
})
