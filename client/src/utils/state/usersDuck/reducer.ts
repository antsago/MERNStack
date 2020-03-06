import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from './types'

const initialState = {
  isLoading: false,
  users: [],
  error: null
}

const actionsMap = {
  [LOAD_USERS]: state => ({
    ...state,
    isLoading: true,
    error: null
  }),
  [LOAD_USERS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    users: action.users,
    error: null
  }),
  [LOAD_USERS_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })
}

export function reducer (state = initialState, action) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}

export const areUsersLoading = state => state.users.isLoading
export const users = state => state.users.users
