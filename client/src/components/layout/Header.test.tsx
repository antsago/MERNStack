import React from 'react'
import { render } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  test('Renders correctly', () => {
    const { getByRole, getByText } = render(<Header />)
    expect(getByText('UsersList')).toBeInTheDocument()
    expect(getByRole('heading')).toBeInTheDocument()
  })
})
