import React from "react"
import { Context, loadUsers } from "../utils"
import { renderWithStore } from "../components/MockStore"
import { Index } from "../pages/index"

describe("Index page", () => {
  test("Renders correctly", () => {
    const user = {
      id: "test",
      givenName: "name",
      familyName: "surname",
      created: new Date(),
    }
    const { getByRole } = renderWithStore(
      <Index
        users={[user]}
        usersLoading
        removeUser={() => {}}
        changeUser={() => {}}
      />,
    )

    expect(getByRole("progressbar")).toBeInTheDocument()
  })

  test("Loads users on initial props", () => {
    const dispatch = jest.fn()
    const contex: Context = ({ store: { dispatch } } as unknown) as Context
    Index.getInitialProps({ ctx: contex })

    expect(dispatch).toHaveBeenCalledWith(loadUsers())
  })
})
