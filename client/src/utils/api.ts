import axios, { AxiosStatic } from 'axios'
import config from './config'

export default class ApiClient {
  constructor (private axios: AxiosStatic = axios) {}

  async makeQuery (query) {
    const response = await this.axios.post(config.apiUrl, { query })
    return response.data.data
  }
}
