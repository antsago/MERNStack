import { expectSaga } from 'redux-saga-test-plan'
import ApiClient from '../../ApiClient'
import { ManageAlerts } from '../utilsDuck'
import { loadUsers as loadUsersSaga } from './saga'
import { loadUsers, loadUsersSuccess } from './actions'

describe('Users Saga', () => {
  test('Users saga finds and loads the users', async () => {
    const users = [{ id: 'test', email: 'test@test.com' }]
    const mockedClient = { makeQuery: jest.fn().mockResolvedValue({ users }) }

    await expectSaga(loadUsersSaga, (mockedClient as any) as ApiClient)
      .put(loadUsersSuccess(users))
      .dispatch(loadUsers())
      .run()

    expect(mockedClient.makeQuery).toHaveBeenCalled()
  })

  test('Users saga handles error', async () => {
    const message = 'testing!'
    const error = new Error(message)
    const mockedClient = { makeQuery: jest.fn().mockRejectedValue(error) }

    await expectSaga(loadUsersSaga, (mockedClient as any) as ApiClient)
      .put.like({
        action: { type: ManageAlerts.ADD_ALERT, alert: { message } }
      })
      .dispatch(loadUsers())
      .run()

    expect(mockedClient.makeQuery).toHaveBeenCalled()
  })
})
