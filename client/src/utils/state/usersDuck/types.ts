import { User } from '../../types'

export const LOAD_USERS = 'LOAD_USERS'
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS'
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR'

export interface UserState {
  isLoading: boolean
  users: User[]
  error: Error
}
