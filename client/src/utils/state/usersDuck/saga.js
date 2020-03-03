import { put, takeEvery } from 'redux-saga/effects'
import { LOAD_USERS } from './types';
import { loadUsersSuccess, loadUsersError } from './actions';

function *loadUsers() {
  try {
    // const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    // const data = yield res.json()
    yield put(loadUsersSuccess([{ id: 1, givenName: 'foo' }]))
  } catch (err) {
    yield put(loadUsersError(err))
  }
}

export function *saga() {
  yield takeEvery(LOAD_USERS, loadUsers)
}
