import { expectSaga } from 'redux-saga-test-plan'
import ApiClient from '../../ApiClient'
import { ManageAlerts } from '../utilsDuck'
import usersSaga from './saga'
import {
  createUser,
  loadUsers,
  updateUser,
  deleteUser,
  createUserSuccess,
  loadUsersSuccess,
  updateUserSuccess,
  deleteUserSuccess
} from './actions'

describe('Users Saga', () => {
  test('Create user creates new user', async () => {
    const newUser = { email: 'test@test.com' }
    const user = { id: 'test', ...newUser }
    const mockedClient = { createUser: jest.fn().mockResolvedValue(user) }

    await expectSaga(usersSaga, (mockedClient as any) as ApiClient)
      .put(createUserSuccess(user))
      .dispatch(createUser(newUser))
      .silentRun()

    expect(mockedClient.createUser).toHaveBeenCalled()
  })

  test('Create user handles error', async () => {
    const newUser = { email: 'test@test.com' }
    const message = 'testing!'
    const error = new Error(message)
    const mockedClient = { createUser: jest.fn().mockRejectedValue(error) }

    await expectSaga(usersSaga, (mockedClient as any) as ApiClient)
      .put.like({
        action: { type: ManageAlerts.ADD_ALERT, alert: { message } }
      })
      .dispatch(createUser(newUser))
      .silentRun()

    expect(mockedClient.createUser).toHaveBeenCalled()
  })

  test('Load users finds and loads the users', async () => {
    const users = [{ id: 'test', email: 'test@test.com' }]
    const mockedClient = { loadUsers: jest.fn().mockResolvedValue(users) }

    await expectSaga(usersSaga, (mockedClient as any) as ApiClient)
      .put(loadUsersSuccess(users))
      .dispatch(loadUsers())
      .silentRun()

    expect(mockedClient.loadUsers).toHaveBeenCalled()
  })

  test('Load users handles error', async () => {
    const message = 'testing!'
    const error = new Error(message)
    const mockedClient = { loadUsers: jest.fn().mockRejectedValue(error) }

    await expectSaga(usersSaga, (mockedClient as any) as ApiClient)
      .put.like({
        action: { type: ManageAlerts.ADD_ALERT, alert: { message } }
      })
      .dispatch(loadUsers())
      .silentRun()

    expect(mockedClient.loadUsers).toHaveBeenCalled()
  })

  test('Update user changes user', async () => {
    const newUser = { email: 'test@test.com' }
    const id = 'test'
    const user = { id, ...newUser }
    const mockedClient = { updateUser: jest.fn().mockResolvedValue(user) }

    await expectSaga(usersSaga, (mockedClient as any) as ApiClient)
      .put(updateUserSuccess(user))
      .dispatch(updateUser(id, newUser))
      .silentRun()

    expect(mockedClient.updateUser).toHaveBeenCalled()
  })

  test('Update user handles error', async () => {
    const newUser = { email: 'test@test.com' }
    const id = 'test'
    const message = 'testing!'
    const error = new Error(message)
    const mockedClient = { updateUser: jest.fn().mockRejectedValue(error) }

    await expectSaga(usersSaga, (mockedClient as any) as ApiClient)
      .put.like({
        action: { type: ManageAlerts.ADD_ALERT, alert: { message } }
      })
      .dispatch(updateUser(id, newUser))
      .silentRun()

    expect(mockedClient.updateUser).toHaveBeenCalled()
  })

  test('Delete user deletes user', async () => {
    const id = 'test'
    const user = { id, email: 'test@test.com' }
    const mockedClient = { deleteUser: jest.fn().mockResolvedValue(user) }

    await expectSaga(usersSaga, (mockedClient as any) as ApiClient)
      .put(deleteUserSuccess(id))
      .dispatch(deleteUser(id))
      .silentRun()

    expect(mockedClient.deleteUser).toHaveBeenCalled()
  })

  test('Delete user handles error', async () => {
    const id = 'test'
    const message = 'testing!'
    const error = new Error(message)
    const mockedClient = { deleteUser: jest.fn().mockRejectedValue(error) }

    await expectSaga(usersSaga, (mockedClient as any) as ApiClient)
      .put.like({
        action: { type: ManageAlerts.ADD_ALERT, alert: { message } }
      })
      .dispatch(deleteUser(id))
      .silentRun()

    expect(mockedClient.deleteUser).toHaveBeenCalled()
  })
})
