import axios, { AxiosStatic } from 'axios'
import config from './config'

export default class ApiClient {
  constructor (
    private url: string = config.apiUrl,
    private fetcher: AxiosStatic = axios
  ) {}

  async makeQuery (query) {
    const response = await this.fetcher.post(this.url, { query })
    return response.data.data
  }
}
