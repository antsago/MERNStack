import axios from 'axios';
import { apiUrl } from './config';

export async function makeQuery(query) {
  return axios.post(apiUrl, { query });
}