import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from './types'
import Reducer from '../ReducerFactory'

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

export const reducer = new Reducer(initialState, actionsMap)

export const areUsersLoading = reducer.selector(state => state.isLoading)
export const users = reducer.selector(state => state.users)
