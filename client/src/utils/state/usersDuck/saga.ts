import { put, takeEvery } from 'redux-saga/effects'
import { makeQuery } from '../../api'
import { Actions } from './types'
import { loadUsersSuccess, loadUsersError } from './actions'

function * loadUsers () {
  try {
    const response = yield makeQuery(
      '{ users{id, givenName, familyName, email, created} }'
    )
    yield put(loadUsersSuccess(response.data.data.users))
  } catch (err) {
    yield put(loadUsersError(err))
  }
}

export function * saga () {
  yield takeEvery(Actions.LOAD_USERS, loadUsers)
}
