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
  // test("Call random user on clicking", () => {
  //   const createRandomUser = jest.fn()
  //   const { getByLabelText } = renderWithState()(<Menu />)

  //   fireEvent.click(getByLabelText("Add random user"))
  //   expect(createRandomUser).toHaveBeenCalled()
  // })

  // test("Add user flow", async () => {
  //   const user = testUser()
  //   const userInput = toUserInput(user)
  //   const createUser = jest.fn(() => ({ data: { createUser: user } }))
  //   const createUserQuery = {
  //     request: {
  //       query: CREATE_USER,
  //       variables: { user: userInput },
  //     },
  //     result: createUser,
  //   }

  //   const { getByLabelText, queryByRole, getByText } = renderWithState([
  //     getUsersQuery(),
  //     createUserQuery,
  //   ])(<Menu />)

  //   userEvent.click(getByLabelText("Add user"))
  //   expect(queryByRole("dialog")).toBeInTheDocument()
  //   await userEvent.type(getByLabelText("Name"), user.givenName)
  //   await userEvent.type(getByLabelText("Surname"), user.familyName)
  //   await userEvent.type(getByLabelText("Email"), user.email)
  //   userEvent.click(getByText("Save"))

  //   await waitFor(() => expect(queryByRole("dialog")).not.toBeInTheDocument())
  //   expect(createUser).toHaveBeenCalled()
  // })
})
