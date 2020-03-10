import { put, takeEvery } from 'redux-saga/effects'
import ApiClient from '../../ApiClient'
import { Actions } from './types'
import { loadUsersSuccess, loadUsersError } from './actions'

export function * loadUsers (apiClient: ApiClient) {
  try {
    const response = yield apiClient.makeQuery(
      '{ users{id, givenName, familyName, email, created} }'
    )
    yield put(loadUsersSuccess(response.users))
  } catch (err) {
    yield put(loadUsersError(err))
  }
}

export default function * saga () {
  yield takeEvery(Actions.LOAD_USERS, loadUsers, new ApiClient())
}
