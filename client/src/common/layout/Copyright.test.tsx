import React from 'react'
import { render } from '@testing-library/react'
import Copyright from './Copyright'

describe('Copyright', () => {
  test('Renders correctly', () => {
    const { getByText } = render(<Copyright />)
    expect(getByText('Copyright', { exact: false })).toBeInTheDocument()
  })
})
