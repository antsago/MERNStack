import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import UserDialog from './UserDialog'

describe('UserDialog', () => {
  test('Renders correctly', () => {
    const user = {
      givenName: 'givenName',
      familyName: 'familyName',
      email: 'email@email.com'
    }
    const { getByText, getByDisplayValue } = render(
      <UserDialog
        user={user}
        onClose={() => { }}
        onSubmit={() => { }}
        open
      />
    )

    expect(getByText('Save')).toBeInTheDocument()
    expect(getByText('Cancel')).toBeInTheDocument()
    expect(getByDisplayValue(user.givenName)).toBeInTheDocument()
    expect(getByDisplayValue(user.familyName)).toBeInTheDocument()
    expect(getByDisplayValue(user.email)).toBeInTheDocument()
  })

  test('Does not fail if closed and user is null', () => {
    const renderDialog = () =>
      render(
        <UserDialog
          open={false}
          user={null}
          onClose={() => { }}
          onSubmit={() => { }}
        />
      )

    expect(renderDialog).not.toThrow()
  })

  test('Calls onClose on cancel', () => {
    const user = {
      givenName: 'givenName',
      familyName: 'familyName',
      email: 'email@email.com'
    }
    const onClose = jest.fn()
    const { getByText } = render(
      <UserDialog
        open
        user={user}
        onClose={onClose}
        onSubmit={() => { }}
      />
    )

    fireEvent.click(getByText('Cancel'))

    expect(onClose).toHaveBeenCalled()
  })

  test('Calls onSubmit on submit', () => {
    const user = {
      givenName: 'givenName',
      familyName: 'familyName',
      email: 'email@email.com'
    }
    const onSubmit = jest.fn()
    const { getByText } = render(
      <UserDialog
        open
        user={user}
        onSubmit={onSubmit}
        onClose={() => { }}
      />
    )

    fireEvent.click(getByText('Save'))

    expect(onSubmit).toHaveBeenCalledWith(user)
  })
})
