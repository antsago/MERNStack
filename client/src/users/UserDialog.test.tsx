import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import UserDialog from './UserDialog'

describe('UserDialog', () => {
  test('Renders correctly', () => {
    const submit = 'Update'
    const user = {
      givenName: 'givenName',
      familyName: 'familyName',
      email: 'email@email.com'
    }
    const { getByText, getByDisplayValue } = render(
      <UserDialog
        user={user}
        submitAction={submit}
        onClose={() => { }}
        onSubmit={() => { }}
        open
      />
    )

    expect(getByText(submit)).toBeInTheDocument()
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
          submitAction={'submit'}
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
        submitAction={'submit'}
        onClose={onClose}
        onSubmit={() => { }}
      />
    )

    fireEvent.click(getByText('Cancel'))

    expect(onClose).toHaveBeenCalled()
  })

  test('Calls onSubmit on submit', () => {
    const submit = 'Update'
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
        submitAction={submit}
        onSubmit={onSubmit}
        onClose={() => { }}
      />
    )

    fireEvent.click(getByText(submit))

    expect(onSubmit).toHaveBeenCalledWith(user)
  })
})
