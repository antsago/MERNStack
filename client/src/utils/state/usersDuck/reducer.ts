import { Actions, UserState } from './types'
import Reducer from '../ReducerFactory'

const initialState: UserState = {
  isLoading: false,
  users: []
}

const actionsMap = {
  [Actions.LOAD_USERS]: state => ({
    ...state,
    isLoading: true
  }),
  [Actions.LOAD_USERS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    users: action.users
  })
}

export const reducer = new Reducer<Actions, UserState>(initialState, actionsMap)

export const areUsersLoading = reducer.selector(state => state.isLoading)
export const users = reducer.selector(state => state.users)
