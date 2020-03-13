import React from 'react'
import { renderWithStore } from '../MockStore'
import Layout from './Layout'

describe('Layout', () => {
  test('Renders correctly', () => {
    const { getByRole, getByText } = renderWithStore(
      <Layout>
        <div>Test</div>
      </Layout>
    )

    expect(getByText('Test')).toBeInTheDocument()
    expect(getByRole('heading')).toBeInTheDocument()
    expect(getByRole('contentinfo')).toBeInTheDocument()
  })
})
