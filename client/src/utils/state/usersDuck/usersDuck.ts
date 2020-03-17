import { takeEvery } from 'redux-saga/effects'
import ApiClient from '../../ApiClient'
import Duck from '../Duck'
import storeDuck from './storeDuck'
import loadingDuck from './loadingDuck'
import {
  createUserSaga,
  loadUsersSaga,
  updateUserSaga,
  deleteUserSaga
} from './sagas'
import { UserInput } from '../../types'

const duck = Duck.fromDucks({ users: storeDuck, isLoading: loadingDuck })

export const createUser = duck.saga({
  type: 'createUser',
  prepare: (payload: UserInput) => ({ payload }),
  effect: type => takeEvery(type, createUserSaga, new ApiClient())
})

export const loadUsers = duck.saga({
  type: 'loadUsers',
  effect: type => takeEvery(type, loadUsersSaga, new ApiClient())
})

export const updateUser = duck.saga({
  type: 'updateUser',
  prepare: (id: string, user: UserInput) => ({ payload: { id, user } }),
  effect: type => takeEvery(type, updateUserSaga, new ApiClient())
})

export const deleteUser = duck.saga({
  type: 'deleteUser',
  prepare: (payload: UserInput) => ({ payload }),
  effect: type => takeEvery(type, deleteUserSaga, new ApiClient())
})

export default duck
