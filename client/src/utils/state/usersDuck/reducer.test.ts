import { List } from 'immutable'
import { reducer } from './reducer'
import {
  createUserSuccess,
  updateUserSuccess,
  deleteUserSuccess
} from './actions'

describe('Users reducer', () => {
  test('Create user', () => {
    const state = {
      isLoading: false,
      users: List()
    }
    const newUser = {
      id: 'test',
      givenName: 'foo'
    }
    const newState = reducer.reducer()(state, createUserSuccess(newUser))

    expect(newState.users).toContain(newUser)
  })

  test('Update user', () => {
    const oldUser = {
      id: 'test',
      givenName: 'old name'
    }
    const newUser = {
      id: 'test',
      givenName: 'new name'
    }
    const state = {
      isLoading: false,
      users: List([oldUser])
    }
    const newState = reducer.reducer()(state, updateUserSuccess(newUser))

    expect(newState.users).not.toContain(oldUser)
    expect(newState.users).toContain(newUser)
  })

  test('Delete user', () => {
    const id = 'test'
    const state = {
      isLoading: false,
      users: List([
        {
          id,
          givenName: 'foo'
        }
      ])
    }
    const newState = reducer.reducer()(state, deleteUserSuccess(id))

    expect(newState.users.size).toBe(0)
  })
})
