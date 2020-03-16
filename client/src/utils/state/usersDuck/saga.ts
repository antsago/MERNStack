import { put, takeEvery, all } from 'redux-saga/effects'
import { UserInput } from '../../types'
import ApiClient from '../../ApiClient'
import { addAlert } from '../utilsDuck'
import { Actions } from './types'
import {
  createUserSuccess,
  loadUsersSuccess,
  updateUserSuccess,
  deleteUserSuccess
} from './actions'

function * createUser (apiClient: ApiClient, action) {
  try {
    const user = yield apiClient.createUser(action.user)
    yield put(createUserSuccess(user))
  } catch (err) {
    const message = err.message || 'We found an error while creating users'
    yield put(addAlert(message))
  }
}

function * loadUsers (apiClient: ApiClient) {
  try {
    const users = yield apiClient.loadUsers()
    yield put(loadUsersSuccess(users))
  } catch (err) {
    const message = err.message || 'We found an error while loading users'
    yield put(addAlert(message))
  }
}

function * updateUser (apiClient: ApiClient, action) {
  try {
    const changedUser = yield apiClient.updateUser(action.id, action.user)
    yield put(updateUserSuccess(changedUser))
  } catch (err) {
    const message = err.message || 'We found an error while updating users'
    yield put(addAlert(message))
  }
}

function * deleteUser (apiClient: ApiClient, action) {
  try {
    const user = yield apiClient.deleteUser(action.id)
    yield put(deleteUserSuccess(user.id))
  } catch (err) {
    const message = err.message || 'We found an error while deleting users'
    yield put(addAlert(message))
  }
}

export default function * saga (apiClient: ApiClient = new ApiClient()) {
  yield all([
    takeEvery(Actions.CREATE_USER, createUser, apiClient),
    takeEvery(Actions.LOAD_USERS, loadUsers, apiClient),
    takeEvery(Actions.UPDATE_USER, updateUser, apiClient),
    takeEvery(Actions.DELETE_USER, deleteUser, apiClient)
  ])
}
