import React from "react"
import { waitFor } from "@testing-library/react"
import { renderWithState } from "../../../testHelpers"
import Layout from "./Layout"

describe("Layout", () => {
  test("Renders correctly", async () => {
    const { getByRole, getByText } = renderWithState()(
      <Layout>
        <div>Test</div>
      </Layout>,
    )

    await waitFor(() => expect(getByText("Test")).toBeInTheDocument())
    expect(getByRole("heading")).toBeInTheDocument()
    expect(getByRole("contentinfo")).toBeInTheDocument()
  })
})
