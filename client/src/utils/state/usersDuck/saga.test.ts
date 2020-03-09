import { expectSaga } from 'redux-saga-test-plan'
import { loadUsers as loadUsersSaga } from './saga'
import { loadUsers, loadUsersSuccess, loadUsersError } from './actions'

describe('Users Saga', () => {
  test('Users saga finds and loads the users', async () => {
    const mockedClient = jest.fn()
    const users = [{ id: 'test', email: 'test@test.com' }]
    mockedClient.mockResolvedValue({ users })

    await expectSaga(loadUsersSaga, mockedClient)
      .put(loadUsersSuccess(users))
      .dispatch(loadUsers())
      .run()

    expect(mockedClient).toHaveBeenCalled()
  })

  test('Users saga handles error', async () => {
    const mockedClient = jest.fn()
    const error = new Error('testing!')
    mockedClient.mockRejectedValue(error)

    await expectSaga(loadUsersSaga, mockedClient)
      .put(loadUsersError(error))
      .dispatch(loadUsers())
      .run()

    expect(mockedClient).toHaveBeenCalled()
  })
})
