import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import UsersList from './UsersList'

describe('UsersList', () => {
  test('Shows loader while loading', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { getByRole, queryByTestId } = render(
      <UsersList
        users={[user]}
        isLoading
        deleteUser={() => {}}
        updateUser={() => {}}
      />
    )

    expect(getByRole('progressbar')).toBeInTheDocument()
    expect(queryByTestId('user-item')).not.toBeInTheDocument()
  })

  test('Shows users after loading', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { queryByRole, getByTestId } = render(
      <UsersList
        users={[user]}
        isLoading={false}
        deleteUser={() => {}}
        updateUser={() => {}}
      />
    )

    expect(queryByRole('progressbar')).not.toBeInTheDocument()
    expect(getByTestId('user-item')).toBeInTheDocument()
  })

  test('Calls updates user when clicking', () => {
    const updateUser = jest.fn()
    const user = {
      id: 'test',
      givenName: 'name',
      familyName: 'surname',
      email: 'email'
    }
    const { queryByRole, getByText } = render(
      <UsersList
        users={[user]}
        isLoading={false}
        deleteUser={() => {}}
        updateUser={updateUser}
      />
    )

    expect(queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(getByText('Update'))
    expect(queryByRole('dialog')).toBeInTheDocument()
    fireEvent.click(getByText('Save'))
    expect(queryByRole('dialog')).not.toBeInTheDocument()
    expect(updateUser).toHaveBeenCalledWith({ ...user, id: undefined })
  })

  test('Calls delete user when clicking', () => {
    const deleteUser = jest.fn()
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { getByText } = render(
      <UsersList
        users={[user]}
        isLoading={false}
        updateUser={() => {}}
        deleteUser={deleteUser}
      />
    )

    fireEvent.click(getByText('Delete'))
    expect(deleteUser).toHaveBeenCalledWith(user.id)
  })
})
