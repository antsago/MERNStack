/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { MockedProvider, MockedResponse } from "@apollo/react-testing"
import { render } from "@testing-library/react"

export const renderWithState = (mocks: MockedResponse[] = []) => (
  ui: JSX.Element,
) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {ui}
    </MockedProvider>,
  )
