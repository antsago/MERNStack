import React from "react"
import { render, fireEvent } from "@testing-library/react"
import UserItem from "./UserItem"

describe("UserItem", () => {
  test("Renders correctly", () => {
    const user = {
      id: "test",
      givenName: "name",
      familyName: "surname",
      email: "foo@foo.com",
      created: new Date(),
    }
    const { getByText } = render(<UserItem user={user} />)

    expect(
      getByText(`${user.givenName} ${user.familyName}`),
    ).toBeInTheDocument()
    expect(getByText(user.email)).toBeInTheDocument()
  })

  test("Updates when clicked", () => {
    const onClickFunct = jest.fn()
    const user = {
      id: "test",
      givenName: "name",
      familyName: "surname",
      created: new Date(),
    }
    const { getByTestId, getByText } = render(
      <UserItem user={user} onUpdate={onClickFunct} />,
    )

    fireEvent.click(getByTestId("user-item"))
    fireEvent.click(getByText("Update"))
    expect(onClickFunct).toHaveBeenCalledTimes(2)
  })

  test("Deletes when clicked", () => {
    const onClickFunct = jest.fn()
    const user = {
      id: "test",
      givenName: "name",
      familyName: "surname",
      created: new Date(),
    }
    const { getByText } = render(
      <UserItem user={user} onDelete={onClickFunct} />,
    )

    fireEvent.click(getByText("Delete"))
    expect(onClickFunct).toHaveBeenCalled()
  })
})
