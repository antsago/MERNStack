import React from "react"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { testUser, User } from "@mernstack/shared"
import {
  renderWithState,
  getUsersQuery,
  updateUserQuery,
  deleteUserQuery,
} from "../../testHelpers"
import UsersList from "./UsersList"

describe("UsersList", () => {
  test("Shows loader while getting users", () => {
    const { getByRole } = renderWithState([getUsersQuery()])(<UsersList />)

    expect(getByRole("progressbar")).toBeInTheDocument()
  })

  test("Does not shows loader when not loading", async () => {
    const { queryByRole } = renderWithState([getUsersQuery()])(<UsersList />)

    await waitFor(() =>
      expect(queryByRole("progressbar")).not.toBeInTheDocument(),
    )
  })

  test("Shows users if given", async () => {
    const { getByTestId } = renderWithState([getUsersQuery()])(<UsersList />)

    await waitFor(() => expect(getByTestId("user-item")).toBeInTheDocument())
  })

  test("Update user", async () => {
    const user = testUser()
    const append = "2"
    const updatedUser: User = { ...user, email: `${user.email}${append}` }
    const mocks = [getUsersQuery([user]), updateUserQuery(updatedUser)]
    const { queryByRole, getByText, getByDisplayValue } = renderWithState(
      mocks,
    )(<UsersList />)
    await waitFor(() => expect(getByText(user.email)).toBeInTheDocument())

    expect(queryByRole("dialog")).not.toBeInTheDocument()
    userEvent.click(getByText("Update"))
    expect(queryByRole("dialog")).toBeInTheDocument()
    await userEvent.type(getByDisplayValue(user.email), append)
    userEvent.click(getByText("Save"))

    await waitFor(() =>
      expect(getByText(updatedUser.email)).toBeInTheDocument(),
    )
    expect(queryByRole("dialog")).not.toBeInTheDocument()
  })

  test("Deletes user", async () => {
    const user = testUser()
    const mocks = [getUsersQuery([user]), deleteUserQuery(user.id)]
    const { queryByText, getByText } = renderWithState(mocks)(<UsersList />)
    await waitFor(() => expect(getByText(user.email)).toBeInTheDocument())

    userEvent.click(getByText("Delete"))

    await waitFor(() => expect(queryByText(user.email)).not.toBeInTheDocument())
  })
})
