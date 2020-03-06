import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from './types'

export function loadUsers () {
  return { type: LOAD_USERS }
}
export function loadUsersSuccess (users) {
  return { type: LOAD_USERS_SUCCESS, users }
}
export function loadUsersError (error) {
  return { type: LOAD_USERS_ERROR, error }
}
