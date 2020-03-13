import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import configureStore from 'redux-mock-store'

export const mockStore = configureStore([])

export const renderWithStore = ui =>
  render(<Provider store={mockStore({ utils: [] })}>{ui}</Provider>)
