import React from "react"
import { waitFor, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithState, testAlert, buildCache } from "../../../testHelpers"
import { useAddAlert } from "../../../utils"
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

  test("Shows added alerts", async () => {
    const message = "Testing alerts"
    const AlertShower = () => {
      const addAlert = useAddAlert()

      return (
        <button onClick={() => addAlert(message)} type="button">
          Add alert
        </button>
      )
    }
    const { getByText } = renderWithState(
      undefined,
      buildCache([]),
    )(
      <>
        <Alerts />
        <AlertShower />
      </>,
    )

    userEvent.click(getByText("Add alert"))

    await waitFor(() => expect(getByText(message)).toBeInTheDocument())
  })
})
