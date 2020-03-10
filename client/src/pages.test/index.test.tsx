import React from 'react'
import { render } from '@testing-library/react'
import { Context } from '../utils'
import { Index } from '../pages/index'

describe('Index page', () => {
  test('Shows loader while loading', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { getByRole, queryByText } = render(
      <Index users={[user]} usersLoading />
    )

    expect(getByRole('progressbar')).toBeInTheDocument()
    expect(queryByText(user.givenName)).not.toBeInTheDocument()
    expect(queryByText(user.familyName)).not.toBeInTheDocument()
  })

  test('Shows users after loading', () => {
    const user = { id: 'test', givenName: 'name', familyName: 'surname' }
    const { queryByRole, getByText } = render(
      <Index users={[user]} usersLoading={false} />
    )

    expect(queryByRole('progressbar')).not.toBeInTheDocument()
    expect(getByText(user.givenName)).toBeInTheDocument()
    expect(getByText(user.familyName)).toBeInTheDocument()
  })

  test('Loads users on initial props', async () => {
    const dispatch = jest.fn()
    const contex: Context = { store: { dispatch } } as any
    await Index.getInitialProps({ ctx: contex })

    expect(dispatch).toHaveBeenCalledWith({ type: 'LOAD_USERS' })
  })
})
