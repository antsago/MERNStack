import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import UserItem from './UserItem'

describe('UserItem', () => {
  test('Renders correctly', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { getByText } = render(<UserItem user={user} />)

    expect(getByText(user.givenName)).toBeInTheDocument()
    expect(getByText(user.familyName)).toBeInTheDocument()
  })

  test('Responds when clicked', () => {
    const onClickFunct = jest.fn()
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { getByTestId } = render(
      <UserItem user={user} onClick={onClickFunct} />
    )

    fireEvent.click(getByTestId('user-item'))
    expect(onClickFunct).toHaveBeenCalled()
  })
})
