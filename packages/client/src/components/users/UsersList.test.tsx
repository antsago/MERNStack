import React from "react"
import { render, fireEvent } from "@testing-library/react"
import UsersList from "./UsersList"

describe("UsersList", () => {
  test("Shows loader when loading", () => {
    const user = {
      id: "test",
      givenName: "name",
      familyName: "surname",
      created: new Date(),
    }
    const { getByRole } = render(
      <UsersList
        users={[user]}
        isLoading
        deleteUser={() => {}}
        updateUser={() => {}}
      />,
    )

    expect(getByRole("progressbar")).toBeInTheDocument()
  })

  test("Does not shows loader when not loading", () => {
    const user = {
      id: "test",
      givenName: "name",
      familyName: "surname",
      created: new Date(),
    }
    const { queryByRole } = render(
      <UsersList
        users={[user]}
        isLoading={false}
        deleteUser={() => {}}
        updateUser={() => {}}
      />,
    )

    expect(queryByRole("progressbar")).not.toBeInTheDocument()
  })

  test("Shows users if given", () => {
    const user = {
      id: "test",
      givenName: "name",
      familyName: "surname",
      created: new Date(),
    }
    const { getByTestId } = render(
      <UsersList
        users={[user]}
        isLoading={false}
        deleteUser={() => {}}
        updateUser={() => {}}
      />,
    )

    expect(getByTestId("user-item")).toBeInTheDocument()
  })

  test("Shows users and loader", () => {
    const user = {
      id: "test",
      givenName: "name",
      familyName: "surname",
      created: new Date(),
    }
    const { getByRole, getByTestId } = render(
      <UsersList
        users={[user]}
        isLoading
        deleteUser={() => {}}
        updateUser={() => {}}
      />,
    )

    expect(getByTestId("user-item")).toBeInTheDocument()
    expect(getByRole("progressbar")).toBeInTheDocument()
  })

  test("Calls updates user when clicking", () => {
    const updateUser = jest.fn()
    const user = {
      id: "test",
      givenName: "name",
      familyName: "surname",
      email: "email",
      created: new Date(),
    }
    const { queryByRole, getByText } = render(
      <UsersList
        users={[user]}
        isLoading={false}
        deleteUser={() => {}}
        updateUser={updateUser}
      />,
    )

    expect(queryByRole("dialog")).not.toBeInTheDocument()
    fireEvent.click(getByText("Update"))
    expect(queryByRole("dialog")).toBeInTheDocument()
    fireEvent.click(getByText("Save"))
    expect(queryByRole("dialog")).not.toBeInTheDocument()
    expect(updateUser).toHaveBeenCalledWith(user.id, {
      ...user,
      id: undefined,
      created: undefined,
    })
  })

  test("Calls delete user when clicking", () => {
    const deleteUser = jest.fn()
    const user = {
      id: "test",
      givenName: "name",
      familyName: "surname",
      created: new Date(),
    }
    const { getByText } = render(
      <UsersList
        users={[user]}
        isLoading={false}
        updateUser={() => {}}
        deleteUser={deleteUser}
      />,
    )

    fireEvent.click(getByText("Delete"))
    expect(deleteUser).toHaveBeenCalledWith(user.id)
  })
})
