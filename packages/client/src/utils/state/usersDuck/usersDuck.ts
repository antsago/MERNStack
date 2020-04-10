import { takeEvery } from "redux-saga/effects"
import { UserInput } from "@djogger/shared"
import Duck from "../Duck"
import { firstNames, lastNames } from "./names"
import storeDuck from "./storeDuck"
import loadingDuck from "./loadingDuck"
import {
  createUserSaga,
  loadUsersSaga,
  updateUserSaga,
  deleteUserSaga,
} from "./sagas"

const duck = Duck.fromDucks({ users: storeDuck, isLoading: loadingDuck })

export const createUser = duck.saga({
  type: "createUser",
  prepare: (payload: UserInput) => ({ payload }),
  effect: (type) => takeEvery(type, createUserSaga),
})

export const loadUsers = duck.saga({
  type: "loadUsers",
  effect: (type) => takeEvery(type, loadUsersSaga),
})

export const updateUser = duck.saga({
  type: "updateUser",
  prepare: (id: string, user: UserInput) => ({ payload: { id, user } }),
  effect: (type) => takeEvery(type, updateUserSaga),
})

export const deleteUser = duck.saga({
  type: "deleteUser",
  prepare: (payload: UserInput) => ({ payload }),
  effect: (type) => takeEvery(type, deleteUserSaga),
})

export const createRandomUser = () => {
  const name = firstNames[Math.floor(Math.random() * firstNames.length)]
  const surname = lastNames[Math.floor(Math.random() * lastNames.length)]

  const randomUser: UserInput = {
    givenName: name,
    familyName: surname,
    email: `${name}@${surname}.com`,
  }

  return createUser(randomUser)
}

export default duck
