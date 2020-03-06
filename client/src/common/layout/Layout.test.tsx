import React from 'react'
import { render } from '@testing-library/react'
import Layout from './Layout'

describe('Layout', () => {
  test('Renders correctly', () => {
    const { getByRole, getByText } = render(
      <Layout>
        <div>Test</div>
      </Layout>
    )

    expect(getByText('Test')).toBeInTheDocument()
    expect(getByRole('heading')).toBeInTheDocument()
    expect(getByRole('contentinfo')).toBeInTheDocument()
  })
})
