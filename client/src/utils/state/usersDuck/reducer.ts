import { Actions, UserState } from './types'
import { List } from 'immutable'
import Reducer from '../ReducerFactory'

const initialState: UserState = {
  isLoading: false,
  users: List()
}

const actionsMap = {
  [Actions.CREATE_USER]: state => state,
  [Actions.CREATE_USER_SUCCESS]: (state, action) => ({
    ...state,
    users: state.users.push(action.user)
  }),
  [Actions.LOAD_USERS]: state => ({
    ...state,
    isLoading: true
  }),
  [Actions.LOAD_USERS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    users: action.users
  }),
  [Actions.UPDATE_USER]: state => state,
  [Actions.UPDATE_USER_SUCCESS]: (state, action) => ({
    ...state,
    users: state.users.map(user =>
      user.id === action.user.id ? action.user : user
    )
  }),
  [Actions.DELETE_USER]: state => state,
  [Actions.DELETE_USER_SUCCESS]: (state, action) => ({
    ...state,
    users: state.users.filter(user => user.id !== action.id)
  })
}

export const reducer = new Reducer<Actions, UserState>(initialState, actionsMap)

export const areUsersLoading = reducer.selector(state => state.isLoading)
export const users = reducer.selector(state => state.users)
