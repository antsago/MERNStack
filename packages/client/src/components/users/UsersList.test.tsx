import React from "react"
import { render, waitFor } from "@testing-library/react"
import {} from "@mernstack/shared"
import { MockedProvider } from "@apollo/react-testing"
import { GET_USERS } from "../../utils/state/users/GetUsers"
import UsersList from "./UsersList"

const mocks = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        users: [
          {
            id: "test",
            givenName: "name",
            familyName: "surname",
            email: "name@surname.com",
            created: new Date(),
          },
        ],
      },
    },
  },
]

const renderWithState = () =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UsersList />
    </MockedProvider>,
  )

describe("UsersList", () => {
  test("Shows loader while getting users", () => {
    const { getByRole } = renderWithState()

    expect(getByRole("progressbar")).toBeInTheDocument()
  })

  test("Does not shows loader when not loading", async () => {
    const { queryByRole } = renderWithState()

    await waitFor(() =>
      expect(queryByRole("progressbar")).not.toBeInTheDocument(),
    )
  })

  test("Shows users if given", async () => {
    const { getByTestId } = renderWithState()

    await waitFor(() => expect(getByTestId("user-item")).toBeInTheDocument())
  })

  // test("Calls updates user when clicking", () => {
  //   const updateUser = jest.fn()
  //   const user = {
  //     id: "test",
  //     givenName: "name",
  //     familyName: "surname",
  //     email: "email",
  //     created: new Date(),
  //   }
  //   const { queryByRole, getByText } = render(<UsersList />)

  //   expect(queryByRole("dialog")).not.toBeInTheDocument()
  //   fireEvent.click(getByText("Update"))
  //   expect(queryByRole("dialog")).toBeInTheDocument()
  //   fireEvent.click(getByText("Save"))
  //   expect(queryByRole("dialog")).not.toBeInTheDocument()
  //   expect(updateUser).toHaveBeenCalledWith(user.id, {
  //     ...user,
  //     id: undefined,
  //     created: undefined,
  //   })
  // })

  // test("Calls delete user when clicking", () => {
  //   const deleteUser = jest.fn()
  //   const user = {
  //     id: "test",
  //     givenName: "name",
  //     familyName: "surname",
  //     created: new Date(),
  //   }
  //   const { getByText } = render(<UsersList />)

  //   fireEvent.click(getByText("Delete"))
  //   expect(deleteUser).toHaveBeenCalledWith(user.id)
  // })
})
