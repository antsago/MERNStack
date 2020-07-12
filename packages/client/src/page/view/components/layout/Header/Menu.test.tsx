import React from "react"
import { renderWithState } from "../../../../testHelpers"
import { Menu } from "./Menu"

describe("Menu", () => {
  test("Renders correctly", () => {
    const { getByLabelText } = renderWithState()(<Menu />)
    expect(getByLabelText("Add user")).toBeInTheDocument()
    expect(getByLabelText("Add random user")).toBeInTheDocument()
  })
})
