import { User } from '../../types'

export interface UserState {
  isLoading: boolean
  users: User[]
}
export enum Actions {
  LOAD_USERS = 'LOAD_USERS',
  LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS'
}

interface LoadUsersAction {
  type: Actions.LOAD_USERS
}

export interface LoadUsersSuccessAction {
  type: Actions.LOAD_USERS_SUCCESS
  users: User[]
}

export type UserActionTypes = LoadUsersAction | LoadUsersSuccessAction
