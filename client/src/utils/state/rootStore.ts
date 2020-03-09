import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import { reducer as usersReducer, saga as usersSaga } from './usersDuck'

usersReducer.setLevel('users')

export const rootReducer = combineReducers({
  users: usersReducer.reducer()
})

export function * rootSaga () {
  yield all([usersSaga()])
}
