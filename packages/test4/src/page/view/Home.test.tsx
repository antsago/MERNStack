import React from "react"
import { waitFor } from "@testing-library/react"
import { testUser } from "@mernstack/shared"
import userEvent from "@testing-library/user-event"
import { renderWithState, getUsersQuery, createUserQuery } from "../testHelpers"
import Home from "./Home"

describe("Index page", () => {
  test("Shows loader and then users", async () => {
    const user = testUser()
    const { getByRole, getByText } = renderWithState([getUsersQuery([user])])(
      <Home />,
    )

    expect(getByRole("progressbar")).toBeInTheDocument()

    await waitFor(() => expect(getByText(user.email)).toBeInTheDocument())
  })

  test("Create new user", async () => {
    const newUser = testUser()
    const mocks = [getUsersQuery([]), createUserQuery(newUser)]
    const {
      getByLabelText,
      queryByRole,
      getByText,
      queryByText,
    } = renderWithState(mocks)(<Home />)
    await waitFor(() =>
      expect(queryByRole("progressbar")).not.toBeInTheDocument(),
    )
    expect(queryByText(newUser.email)).not.toBeInTheDocument()

    userEvent.click(getByLabelText("Add user"))
    expect(queryByRole("dialog")).toBeInTheDocument()
    await userEvent.type(getByLabelText("Name"), newUser.givenName)
    await userEvent.type(getByLabelText("Surname"), newUser.familyName)
    await userEvent.type(getByLabelText("Email"), newUser.email)
    userEvent.click(getByText("Save"))

    await waitFor(() => expect(queryByRole("dialog")).not.toBeInTheDocument())
    expect(getByText(newUser.email)).toBeInTheDocument()
  })
})
