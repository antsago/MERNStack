import React from 'react'
import { render } from '@testing-library/react'
import UserDialog from './UserDialog'

describe('UserDialog', () => {
  test('Renders correctly', () => {
    const title = 'Test title'
    const submit = 'Update'
    const user = {
      id: 'test',
      givenName: 'givenName',
      familyName: 'familyName',
      email: 'email@email.com'
    }
    const { getByText, getByDisplayValue } = render(
      <UserDialog
        user={user}
        open
        title={title}
        submitAction={submit}
      />
    )

    expect(getByText(title)).toBeInTheDocument()
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
          title={'title'}
          submitAction={'submit'}
        />
      )

    expect(renderDialog).not.toThrow()
  })
})
