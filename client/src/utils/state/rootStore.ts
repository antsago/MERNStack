import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import { reducer as usersReducer, saga as usersSaga } from './usersDuck'

export const rootReducer = combineReducers({
  users: usersReducer
})

export function * rootSaga () {
  yield all([usersSaga()])
}
