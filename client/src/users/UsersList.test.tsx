import React from 'react'
import { render } from '@testing-library/react'
import UsersList from './UsersList'

describe('UsersList', () => {
  test('Shows loader while loading', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { getByRole, queryByText } = render(
      <UsersList users={[user]} isLoading />
    )

    expect(getByRole('progressbar')).toBeInTheDocument()
    expect(queryByText(user.givenName)).not.toBeInTheDocument()
    expect(queryByText(user.familyName)).not.toBeInTheDocument()
  })

  test('Shows users after loading', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { queryByRole, getByText } = render(
      <UsersList users={[user]} isLoading={false} />
    )

    expect(queryByRole('progressbar')).not.toBeInTheDocument()
    expect(getByText(user.givenName)).toBeInTheDocument()
    expect(getByText(user.familyName)).toBeInTheDocument()
  })
})
