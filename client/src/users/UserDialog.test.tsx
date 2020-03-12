import React from 'react'
import { render } from '@testing-library/react'
import UserDialog from './UserDialog'

describe('UserDialog', () => {
  test('Renders correctly', () => {
    const title = "Test title"
    const { getByText } = render(<UserDialog open title={title} />)

    expect(getByText(title)).toBeInTheDocument()
  })
})
