import { all } from 'redux-saga/effects'
import { reducer as usersReducer, saga as usersSaga } from './usersDuck'
import { reducer as utilsReducer } from './utilsDuck'
import { mapReducers } from './ReducerFactory'

export const rootReducer = mapReducers({
  users: usersReducer,
  utils: utilsReducer
})

export function * rootSaga () {
  yield all([usersSaga()])
}
