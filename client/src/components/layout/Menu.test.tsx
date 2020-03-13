import React from 'react'
import { render } from '@testing-library/react'
import Menu from './Menu'

describe('Menu', () => {
  test('Renders correctly', () => {
    const { queryAllByRole } = render(<Menu />)
    const buttons = queryAllByRole('button')
    expect(buttons[0]).toBeInTheDocument()
    expect(buttons[1]).toBeInTheDocument()
  })
})
