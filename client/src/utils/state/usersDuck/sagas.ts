import { put } from 'redux-saga/effects'
import ApiClient from '../../ApiClient'
import { addAlert } from '../utilsDuck'
import {
  addUser,
  appendUsers,
  updateUser as changeUser,
  deleteUser as removeUser
} from './storeDuck'
import { startLoading, stopLoading } from './loadingDuck'

export function * createUserSaga (action, apiClient = new ApiClient()) {
  try {
    yield put(startLoading())
    const user = yield apiClient.createUser(action.payload)
    yield put(addUser(user))
  } catch (err) {
    const message = err.message || 'We found an error while creating users'
    yield put(addAlert(message))
  } finally {
    yield put(stopLoading())
  }
}

export function * loadUsersSaga (action, apiClient = new ApiClient()) {
  try {
    yield put(startLoading())
    const users = yield apiClient.loadUsers()
    yield put(appendUsers(users))
  } catch (err) {
    const message = err.message || 'We found an error while loading users'
    yield put(addAlert(message))
  } finally {
    yield put(stopLoading())
  }
}

export function * updateUserSaga (action, apiClient = new ApiClient()) {
  try {
    yield put(startLoading())
    const changedUser = yield apiClient.updateUser(
      action.payload.id,
      action.payload.user
    )
    yield put(changeUser(changedUser))
  } catch (err) {
    const message = err.message || 'We found an error while updating users'
    yield put(addAlert(message))
  } finally {
    yield put(stopLoading())
  }
}

export function * deleteUserSaga (action, apiClient = new ApiClient()) {
  try {
    yield put(startLoading())
    const user = yield apiClient.deleteUser(action.payload)
    yield put(removeUser(user.id))
  } catch (err) {
    const message = err.message || 'We found an error while deleting users'
    yield put(addAlert(message))
  } finally {
    yield put(stopLoading())
  }
}
