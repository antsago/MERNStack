import { all } from 'redux-saga/effects'
import { reducer as usersReducer, saga as usersSaga } from './usersDuck'
import { mapReducers } from './ReducerFactory'

export const rootReducer = mapReducers({
  users: usersReducer
})

export function * rootSaga () {
  yield all([usersSaga()])
}
