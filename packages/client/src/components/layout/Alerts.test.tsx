import React from "react"
import { waitFor, act } from "@testing-library/react"
import { renderWithState, testAlert, buildCache } from "../../testHelpers"
import Alerts from "./Alerts"

describe("Alert", () => {
  test("Renders correctly", () => {
    const alert = testAlert()
    const { getByText } = renderWithState(
      undefined,
      buildCache([alert]),
    )(<Alerts />)

    expect(getByText(alert.message)).toBeInTheDocument()
  })

  test("Dismiss alerts after timeout", async () => {
    jest.useFakeTimers()
    const alert = testAlert()
    const { getByText, queryByText } = renderWithState(
      undefined,
      buildCache([alert]),
    )(<Alerts />)
    expect(getByText(alert.message)).toBeInTheDocument()

    act(() => jest.runAllTimers())

    await waitFor(() =>
      expect(queryByText(alert.message)).not.toBeInTheDocument(),
    )
  })
})
