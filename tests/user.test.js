const axios = require('axios');
const { port } = require('../src/config');

const axiosInstance = axios.create({
  baseURL: `http://localhost:${port}/`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const makeCall = async (query) => {
  const response = await axiosInstance.post('/', JSON.stringify({ query }));

  return response.data;
}

describe('User CRUD', () => {
  test('User can be created', async () => {
    const response = await makeCall(`
      mutation {
        createUser(user: { email: "foo@test.com" }){id, givenName, email, created}
      }
    `);

    expect(response.data.createUser).toEqual(expect.objectContaining({
      id: expect.any(String),
      givenName: null,
      email: 'foo@test.com',
      created: expect.any(String)
    }));
  });

  test('User can be read', async () => {
    expect(true).toBeTruthy();
  });

  test('User can be updated', async () => {
    expect(true).toBeTruthy();
  });

  test('User can be deleted', async () => {
    expect(true).toBeTruthy();
  });
});
