import React from "react"
import { renderWithStore } from "../MockStore"
import { Layout } from "./Layout"

describe("Layout", () => {
  test("Renders correctly", () => {
    const { getByRole, getByText } = renderWithStore(
      <Layout showAlert={() => {}} classes={{ root: "", content: "" }}>
        <div>Test</div>
      </Layout>,
    )

    expect(getByText("Test")).toBeInTheDocument()
    expect(getByRole("heading")).toBeInTheDocument()
    expect(getByRole("contentinfo")).toBeInTheDocument()
  })

  test("Handles errors gracefully", () => {
    // Silence the console
    const spy = jest.spyOn(console, "error")
    spy.mockImplementation(() => {})

    const showAlert = jest.fn()
    const message = "An error"
    const Bug = () => {
      throw new Error(message)
    }

    const { getByRole } = renderWithStore(
      <Layout showAlert={showAlert} classes={{ root: "", content: "" }}>
        <Bug />
      </Layout>,
    )

    expect(getByRole("heading")).toBeInTheDocument()
    expect(getByRole("contentinfo")).toBeInTheDocument()

    expect(showAlert).toHaveBeenCalledWith(message)

    spy.mockRestore()
  })
})
