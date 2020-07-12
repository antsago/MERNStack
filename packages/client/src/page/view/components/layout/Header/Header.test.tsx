import React from "react"
import { renderWithState } from "../../../../testHelpers"
import Header from "./Header"

describe("Header", () => {
  test("Renders correctly", () => {
    const { getByRole, getByText } = renderWithState()(<Header />)
    expect(getByText("UsersList")).toBeInTheDocument()
    expect(getByRole("heading")).toBeInTheDocument()
  })
})
