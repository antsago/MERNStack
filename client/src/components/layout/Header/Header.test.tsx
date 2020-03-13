import React from 'react'
import { renderWithStore } from '../../MockStore'
import Header from './Header'

describe('Header', () => {
  test('Renders correctly', () => {
    const { getByRole, getByText } = renderWithStore(<Header />)
    expect(getByText('UsersList')).toBeInTheDocument()
    expect(getByRole('heading')).toBeInTheDocument()
  })
})
