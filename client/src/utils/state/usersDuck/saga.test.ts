import { expectSaga } from 'redux-saga-test-plan'
import { loadUsers as loadUsersSaga } from './saga'
import { loadUsers, loadUsersSuccess, loadUsersError } from './actions'
import ApiClient from '../../ApiClient'

describe('Users Saga', () => {
  test('Users saga finds and loads the users', async () => {
    const users = [{ id: 'test', email: 'test@test.com' }]
    const mockedClient = { makeQuery: jest.fn().mockResolvedValue({ users }) }

    await expectSaga(loadUsersSaga, mockedClient as ApiClient)
      .put(loadUsersSuccess(users))
      .dispatch(loadUsers())
      .run()

    expect(mockedClient).toHaveBeenCalled()
  })

  test('Users saga handles error', async () => {
    const error = new Error('testing!')
    const mockedClient = { makeQuery: jest.fn().mockRejectedValue(error) }

    await expectSaga(loadUsersSaga, mockedClient as ApiClient)
      .put(loadUsersError(error))
      .dispatch(loadUsers())
      .run()

    expect(mockedClient).toHaveBeenCalled()
  })
})
