import { User } from '../../types'

export interface UserState {
  isLoading: boolean
  users: User[]
  error: Error
}
export enum Actions {
  LOAD_USERS = 'LOAD_USERS',
  LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS',
  LOAD_USERS_ERROR = 'LOAD_USERS_ERROR'
}

interface LoadUsersAction {
  type: Actions.LOAD_USERS
}

export interface LoadUsersSuccessAction {
  type: Actions.LOAD_USERS_SUCCESS
  users: User[]
}

interface LoadUsersErrorAction {
  type: Actions.LOAD_USERS_ERROR
  error: Error
}

export type UserActionTypes =
  | LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersErrorAction
