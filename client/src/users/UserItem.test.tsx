import React from 'react'
import { render } from '@testing-library/react'
import UserItem from './UserItem'

describe('UserItem', () => {
  test('Renders correctly', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { getByText } = render(<UserItem user={user} />)

    expect(getByText(user.givenName)).toBeInTheDocument()
    expect(getByText(user.familyName)).toBeInTheDocument()
  })
})
