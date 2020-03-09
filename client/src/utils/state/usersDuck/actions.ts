import { User } from '../../types'
import { Actions, UserActionTypes } from './types'

export function loadUsers (): UserActionTypes {
  return { type: Actions.LOAD_USERS }
}
export function loadUsersSuccess (users: User[]): UserActionTypes {
  return { type: Actions.LOAD_USERS_SUCCESS, users }
}
export function loadUsersError (error: Error): UserActionTypes {
  return { type: Actions.LOAD_USERS_ERROR, error }
}
