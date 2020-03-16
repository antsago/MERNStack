import { User, UserInput } from '../../types'
import { Actions, UserActionTypes } from './types'

export function createUser (user: UserInput): UserActionTypes {
  return { type: Actions.CREATE_USER, user }
}
export function createUserSuccess (user: User): UserActionTypes {
  return { type: Actions.CREATE_USER_SUCCESS, user }
}
export function loadUsers (): UserActionTypes {
  return { type: Actions.LOAD_USERS }
}
export function loadUsersSuccess (users: User[]): UserActionTypes {
  return { type: Actions.LOAD_USERS_SUCCESS, users }
}
export function updateUser (id: string, user: UserInput): UserActionTypes {
  return { type: Actions.UPDATE_USER, user, id }
}
export function updateUserSuccess (user: User): UserActionTypes {
  return { type: Actions.UPDATE_USER_SUCCESS, user }
}
export function deleteUser (id: string): UserActionTypes {
  return { type: Actions.DELETE_USER, id }
}
export function deleteUserSuccess (id: string): UserActionTypes {
  return { type: Actions.DELETE_USER_SUCCESS, id }
}
