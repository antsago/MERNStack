import axios from 'axios';

const SERVER_URL = 'http://localhost:4000/';

export async function makeQuery(query) {
  return axios.post( SERVER_URL, { query });
}