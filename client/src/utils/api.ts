import axios from 'axios'
import config from './config'

export async function makeQuery (query) {
  return axios.post(config.apiUrl, { query })
}
