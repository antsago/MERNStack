import React from "react"
import { render } from "@testing-library/react"
import Footer from "./Footer"

describe("Footer", () => {
  test("Renders correctly", () => {
    const { getByRole } = render(<Footer />)
    expect(getByRole("contentinfo")).toBeInTheDocument()
  })
})
