import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Alert } from './Alert'

describe('Alert', () => {
  test('Renders correctly', () => {
    const alert = {
      id: 1,
      message: "A test message",
    }
    const { getByText } = render(<Alert alert={alert} onDismiss={() => { }} />)
    expect(getByText(alert.message)).toBeInTheDocument()
  })

  test('Does not throw when not given an alert', () => {
    const renderAlert = () => render(<Alert onDismiss={() => { }} />)

    expect(renderAlert).not.toThrow();
  })

  test('Calls dismiss when clicking on close', () => {
    const dissmiss = jest.fn()
    const alert = {
      id: 1,
      message: "A test message",
    }
    const { getByText, getByLabelText } = render(<Alert alert={alert} onDismiss={dissmiss} />)

    expect(getByText(alert.message)).toBeInTheDocument()
    fireEvent.click(getByLabelText('close'))
    expect(dissmiss).toHaveBeenCalled()
  })
})
