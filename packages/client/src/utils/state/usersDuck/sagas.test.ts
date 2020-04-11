import { expectSaga } from "redux-saga-test-plan"
import { User } from "@mernstack/shared"
import ApiClient from "../../ApiClient"
import { addAlert } from "../utilsDuck"
import {
  addUser,
  appendUsers,
  updateUser as changeUser,
  deleteUser as removeUser,
} from "./storeDuck"
import { startLoading, stopLoading } from "./loadingDuck"
import { createUser, loadUsers, updateUser, deleteUser } from "./usersDuck"
import {
  createUserSaga,
  loadUsersSaga,
  updateUserSaga,
  deleteUserSaga,
} from "./sagas"

describe("Users sagas", () => {
  test("Create user creates new user", async () => {
    const newUser = { email: "test@test.com", created: new Date() }
    const user: User = { id: "test", ...newUser }
    const mockedClient = { createUser: jest.fn().mockResolvedValue(user) }

    await expectSaga(
      createUserSaga,
      createUser(newUser),
      (mockedClient as unknown) as ApiClient,
    )
      .put(startLoading())
      .put(addUser(user))
      .put(stopLoading())
      .run()

    expect(mockedClient.createUser).toHaveBeenCalled()
  })

  test("Create user handles error", async () => {
    const newUser = { email: "test@test.com" }
    const message = "testing!"
    const error = new Error(message)
    const mockedClient = { createUser: jest.fn().mockRejectedValue(error) }

    await expectSaga(
      createUserSaga,
      createUser(newUser),
      (mockedClient as unknown) as ApiClient,
    )
      .put(startLoading())
      .put.like({
        action: { type: addAlert.type, payload: { message } },
      })
      .put(stopLoading())
      .run()

    expect(mockedClient.createUser).toHaveBeenCalled()
  })

  test("Load users finds and loads the users", async () => {
    const users = [{ id: "test", email: "test@test.com", created: new Date() }]
    const mockedClient = { users: jest.fn().mockResolvedValue(users) }

    await expectSaga(
      loadUsersSaga,
      loadUsers(),
      (mockedClient as unknown) as ApiClient,
    )
      .put(startLoading())
      .put(appendUsers(users))
      .put(stopLoading())
      .run()

    expect(mockedClient.users).toHaveBeenCalled()
  })

  test("Load users handles error", async () => {
    const message = "testing!"
    const error = new Error(message)
    const mockedClient = { users: jest.fn().mockRejectedValue(error) }

    await expectSaga(
      loadUsersSaga,
      loadUsers(),
      (mockedClient as unknown) as ApiClient,
    )
      .put(startLoading())
      .put.like({
        action: { type: addAlert.type, payload: { message } },
      })
      .put(stopLoading())
      .run()

    expect(mockedClient.users).toHaveBeenCalled()
  })

  test("Update user changes user", async () => {
    const newUser = { email: "test@test.com", created: new Date() }
    const id = "test"
    const user = { id, ...newUser }
    const mockedClient = { updateUser: jest.fn().mockResolvedValue(user) }

    await expectSaga(
      updateUserSaga,
      updateUser(id, newUser),
      (mockedClient as unknown) as ApiClient,
    )
      .put(startLoading())
      .put(changeUser(user))
      .put(stopLoading())
      .run()

    expect(mockedClient.updateUser).toHaveBeenCalled()
  })

  test("Update user handles error", async () => {
    const newUser = { email: "test@test.com" }
    const id = "test"
    const message = "testing!"
    const error = new Error(message)
    const mockedClient = { updateUser: jest.fn().mockRejectedValue(error) }

    await expectSaga(
      updateUserSaga,
      updateUser(id, newUser),
      (mockedClient as unknown) as ApiClient,
    )
      .put(startLoading())
      .put.like({
        action: { type: addAlert.type, payload: { message } },
      })
      .put(stopLoading())
      .run()

    expect(mockedClient.updateUser).toHaveBeenCalled()
  })

  test("Delete user deletes user", async () => {
    const id = "test"
    const user = { id, email: "test@test.com" }
    const mockedClient = { deleteUser: jest.fn().mockResolvedValue(user) }

    await expectSaga(
      deleteUserSaga,
      deleteUser(id),
      (mockedClient as unknown) as ApiClient,
    )
      .put(startLoading())
      .put(removeUser(id))
      .put(stopLoading())
      .run()

    expect(mockedClient.deleteUser).toHaveBeenCalled()
  })

  test("Delete user handles error", async () => {
    const id = "test"
    const message = "testing!"
    const error = new Error(message)
    const mockedClient = { deleteUser: jest.fn().mockRejectedValue(error) }

    await expectSaga(
      deleteUserSaga,
      deleteUser(id),
      (mockedClient as unknown) as ApiClient,
    )
      .put(startLoading())
      .put.like({
        action: { type: addAlert.type, payload: { message } },
      })
      .put(stopLoading())
      .run()

    expect(mockedClient.deleteUser).toHaveBeenCalled()
  })
})
