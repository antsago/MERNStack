import { User, UserInput } from '../../types'
import { List } from 'immutable'

export interface UserState {
  isLoading: boolean
  users: List<User>
}
export enum Actions {
  CREATE_USER = 'CREATE_USER',
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
  LOAD_USERS = 'LOAD_USERS',
  LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  DELETE_USER = 'DELETE_USER',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
}

interface CreateUserAction {
  type: Actions.CREATE_USER
  user: UserInput
}
interface CreateUserSuccessAction {
  type: Actions.CREATE_USER_SUCCESS
  user: User
}
interface LoadUsersAction {
  type: Actions.LOAD_USERS
}
interface LoadUsersSuccessAction {
  type: Actions.LOAD_USERS_SUCCESS
  users: User[]
}
interface UpdateUserAction {
  type: Actions.UPDATE_USER
  id: string
  user: UserInput
}
interface UpdateUserSuccessAction {
  type: Actions.UPDATE_USER_SUCCESS
  user: User
}
interface DeleteUserAction {
  type: Actions.DELETE_USER
  id: string
}
interface DeleteUserSuccessAction {
  type: Actions.DELETE_USER_SUCCESS
  id: string
}

export type UserActionTypes =
  | CreateUserAction
  | CreateUserSuccessAction
  | LoadUsersAction
  | LoadUsersSuccessAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | DeleteUserAction
  | DeleteUserSuccessAction
