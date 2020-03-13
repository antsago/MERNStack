import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import UsersList from './UsersList'

describe('UsersList', () => {
  test('Shows loader while loading', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { getByRole, queryByTestId } = render(
      <UsersList users={[user]} isLoading deleteUser={() => { }} updateUser={() => { }} />
    )

    expect(getByRole('progressbar')).toBeInTheDocument()
    expect(queryByTestId('user-item')).not.toBeInTheDocument()
  })

  test('Shows users after loading', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { queryByRole, getByTestId } = render(
      <UsersList users={[user]} isLoading={false} deleteUser={() => { }} updateUser={() => { }} />
    )

    expect(queryByRole('progressbar')).not.toBeInTheDocument()
    expect(getByTestId('user-item')).toBeInTheDocument()
  })

  test('Shows dialog when clicking on user', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { queryByRole, getByTestId } = render(
      <UsersList users={[user]} isLoading={false} deleteUser={() => { }} updateUser={() => { }} />
    )

    expect(queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(getByTestId('user-item'))
    expect(queryByRole('dialog')).toBeInTheDocument()
  })
})
