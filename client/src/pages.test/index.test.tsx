import React from 'react'
import { render } from '@testing-library/react'
import { Context } from '../utils'
import { Index } from '../pages/index'

describe('Index page', () => {
  test('Renders correctly', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { getByRole } = render(
      <Index users={[user]} usersLoading />
    )

    expect(getByRole('progressbar')).toBeInTheDocument()
  })

  test('Loads users on initial props', async () => {
    const dispatch = jest.fn()
    const contex: Context = { store: { dispatch } } as any
    await Index.getInitialProps({ ctx: contex })

    expect(dispatch).toHaveBeenCalledWith({ type: 'LOAD_USERS' })
  })
})
