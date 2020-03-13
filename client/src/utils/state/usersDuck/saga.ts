import { put, takeEvery } from 'redux-saga/effects'
import ApiClient from '../../ApiClient'
import { addAlert } from '../utilsDuck'
import { Actions } from './types'
import { loadUsersSuccess } from './actions'

export function * loadUsers (apiClient: ApiClient) {
  try {
    const response = yield apiClient.makeQuery(
      '{ users{id, givenName, familyName, email, created} }'
    )
    yield put(loadUsersSuccess(response.users))
  } catch (err) {
    const message = err.message || 'We found an error while loading users'
    yield put(addAlert(message))
  }
}

export default function * saga () {
  yield takeEvery(Actions.LOAD_USERS, loadUsers, new ApiClient())
}
