import React from "react"
import { renderWithState, testAlert } from "../../testHelpers"
import Alerts from "./Alerts"

describe("Alert", () => {
  test("Renders correctly", () => {
    const alert = testAlert()
    const { getByText } = renderWithState(undefined, [alert])(<Alerts />)

    expect(getByText(alert.message)).toBeInTheDocument()
  })

  // test("Calls dismiss when clicking on close", () => {
  //   const dissmiss = jest.fn()
  //   const alert = {
  //     id: 1,
  //     message: "A test message",
  //   }
  //   const { getByText, getByLabelText } = render(<Alerts />)

  //   expect(getByText(alert.message)).toBeInTheDocument()
  //   fireEvent.click(getByLabelText("close"))
  //   expect(dissmiss).toHaveBeenCalled()
  // })
})
