/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { MockedProvider, MockedResponse } from "@apollo/react-testing"
import { render } from "@testing-library/react"
import { resolvers, getCache } from "../utils/state/WithApollo"
import { GET_ALERTS } from "../utils/state/alerts/GetAlerts"
import { Alert } from "../utils"

export const testAlert = () => ({
  id: 1,
  message: "A test message",
})

function buildCache(alerts: Alert[]) {
  const cache = getCache()
  cache.writeQuery({
    query: GET_ALERTS,
    data: {
      alerts,
    },
  })

  return cache
}

export const renderWithState = (
  mocks: MockedResponse[] = [],
  alerts: Alert[] = [],
) => (ui: JSX.Element) =>
  render(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
      resolvers={resolvers}
      cache={buildCache(alerts)}
    >
      {ui}
    </MockedProvider>,
  )
