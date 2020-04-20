import React from "react"
import { waitFor } from "@testing-library/react"
import { testUser } from "@mernstack/shared"
import userEvent from "@testing-library/user-event"
import { renderWithState, getUsersQuery, createUserQuery } from "../testHelpers"
import { Index } from "../pages/index"

describe("Index page", () => {
  test("Shows loader and then users", async () => {
    const user = testUser()
    const { getByRole, getByText } = renderWithState([getUsersQuery([user])])(
      <Index />,
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
    } = renderWithState(mocks)(<Index />)
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

  // test("Create random user", async () => {
  //   const mocks = [getUsersQuery(), createUserQuery()]
  //   const {
  //     getByLabelText,
  //     queryByRole,
  //     getByTestId,
  //     queryByTestId,
  //   } = renderWithState()(<Index />)
  //   await waitFor(() =>
  //     expect(queryByRole("progressbar")).not.toBeInTheDocument(),
  //   )
  //   expect(queryByTestId("user-item")).not.toBeInTheDocument()

  //   userEvent.click(getByLabelText("Add random user"))

  //   await waitFor(() => expect(getByTestId("user-item")).toBeInTheDocument())
  // })
})
