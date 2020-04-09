import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { Menu } from "./Menu"

describe("Menu", () => {
  test("Renders correctly", () => {
    const { getByLabelText } = render(
      <Menu createUser={() => {}} createRandomUser={() => {}} />,
    )
    expect(getByLabelText("Add user")).toBeInTheDocument()
    expect(getByLabelText("Add random user")).toBeInTheDocument()
  })

  test("Call random user on clicking", () => {
    const createRandomUser = jest.fn()
    const { getByLabelText } = render(
      <Menu createUser={() => {}} createRandomUser={createRandomUser} />,
    )

    fireEvent.click(getByLabelText("Add random user"))
    expect(createRandomUser).toHaveBeenCalled()
  })

  test("Add user flow", () => {
    const createUser = jest.fn()
    const { getByLabelText, queryByRole, getByText } = render(
      <Menu createRandomUser={() => {}} createUser={createUser} />,
    )

    fireEvent.click(getByLabelText("Add user"))
    expect(queryByRole("dialog")).toBeInTheDocument()
    fireEvent.click(getByText("Save"))
    expect(queryByRole("dialog")).not.toBeInTheDocument()
    expect(createUser).toHaveBeenCalled()
  })
})
