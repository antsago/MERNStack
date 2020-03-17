import { expectSaga } from 'redux-saga-test-plan'
import ApiClient from '../../ApiClient'
import { addAlert } from '../utilsDuck'
import {
  addUser,
  appendUsers,
  updateUser as changeUser,
  deleteUser as removeUser
} from './storeDuck'
import { startLoading, stopLoading } from './loadingDuck'
import { createUser, updateUser, deleteUser } from './usersDuck'
import {
  createUserSaga,
  loadUsersSaga,
  updateUserSaga,
  deleteUserSaga
} from './sagas'

describe('Users Saga', () => {
  test('Create user creates new user', async () => {
    const newUser = { email: 'test@test.com' }
    const user = { id: 'test', ...newUser }
    const mockedClient = { createUser: jest.fn().mockResolvedValue(user) }

    await expectSaga(
      createUserSaga,
      (mockedClient as any) as ApiClient,
      createUser(newUser)
    )
      .put(startLoading())
      .put(addUser(user))
      .put(stopLoading())
      .run()

    expect(mockedClient.createUser).toHaveBeenCalled()
  })

  test('Create user handles error', async () => {
    const newUser = { email: 'test@test.com' }
    const message = 'testing!'
    const error = new Error(message)
    const mockedClient = { createUser: jest.fn().mockRejectedValue(error) }

    await expectSaga(
      createUserSaga,
      (mockedClient as any) as ApiClient,
      createUser(newUser)
    )
      .put(startLoading())
      .put.like({
        action: { type: addAlert.type, alert: { message } }
      })
      .run()

    expect(mockedClient.createUser).toHaveBeenCalled()
  })

  test('Load users finds and loads the users', async () => {
    const users = [{ id: 'test', email: 'test@test.com' }]
    const mockedClient = { loadUsers: jest.fn().mockResolvedValue(users) }

    await expectSaga(loadUsersSaga, (mockedClient as any) as ApiClient)
      .put(startLoading())
      .put(appendUsers(users))
      .put(stopLoading())
      .run()

    expect(mockedClient.loadUsers).toHaveBeenCalled()
  })

  test('Load users handles error', async () => {
    const message = 'testing!'
    const error = new Error(message)
    const mockedClient = { loadUsers: jest.fn().mockRejectedValue(error) }

    await expectSaga(loadUsersSaga, (mockedClient as any) as ApiClient)
      .put(startLoading())
      .put.like({
        action: { type: addAlert.type, alert: { message } }
      })
      .run()

    expect(mockedClient.loadUsers).toHaveBeenCalled()
  })

  test('Update user changes user', async () => {
    const newUser = { email: 'test@test.com' }
    const id = 'test'
    const user = { id, ...newUser }
    const mockedClient = { updateUser: jest.fn().mockResolvedValue(user) }

    await expectSaga(
      updateUserSaga,
      (mockedClient as any) as ApiClient,
      updateUser(id, newUser)
    )
      .put(startLoading())
      .put(changeUser(user))
      .put(stopLoading())
      .run()

    expect(mockedClient.updateUser).toHaveBeenCalled()
  })

  test('Update user handles error', async () => {
    const newUser = { email: 'test@test.com' }
    const id = 'test'
    const message = 'testing!'
    const error = new Error(message)
    const mockedClient = { updateUser: jest.fn().mockRejectedValue(error) }

    await expectSaga(
      updateUserSaga,
      (mockedClient as any) as ApiClient,
      updateUser(id, newUser)
    )
      .put(startLoading())
      .put.like({
        action: { type: addAlert.type, alert: { message } }
      })
      .run()

    expect(mockedClient.updateUser).toHaveBeenCalled()
  })

  test('Delete user deletes user', async () => {
    const id = 'test'
    const user = { id, email: 'test@test.com' }
    const mockedClient = { deleteUser: jest.fn().mockResolvedValue(user) }

    await expectSaga(
      deleteUserSaga,
      (mockedClient as any) as ApiClient,
      deleteUser(id)
    )
      .put(startLoading())
      .put(removeUser(id))
      .put(stopLoading())
      .run()

    expect(mockedClient.deleteUser).toHaveBeenCalled()
  })

  test('Delete user handles error', async () => {
    const id = 'test'
    const message = 'testing!'
    const error = new Error(message)
    const mockedClient = { deleteUser: jest.fn().mockRejectedValue(error) }

    await expectSaga(
      deleteUserSaga,
      (mockedClient as any) as ApiClient,
      deleteUser(id)
    )
      .put(startLoading())
      .put.like({
        action: { type: addAlert.type, alert: { message } }
      })
      .silentRun()

    expect(mockedClient.deleteUser).toHaveBeenCalled()
  })
})
