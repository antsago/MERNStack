/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { MockedProvider, MockedResponse } from "@apollo/react-testing"
import { render } from "@testing-library/react"
import { User, testUser } from "@mernstack/shared"
import { GET_USERS } from "../utils/state/users/GetUsers"
import { DELETE_USER } from "../utils/state/users/DeleteUser"

export const getUsersQuery = (users: User[] = [testUser()]) => ({
  request: {
    query: GET_USERS,
  },
  result: {
    data: {
      users,
    },
  },
})

export const deleteUserQuery = (id: string) => ({
  request: {
    query: DELETE_USER,
    variables: { id },
  },
  result: { data: { deleteUser: { id } } },
})

export const renderWithState = (mocks: MockedResponse[], ui: JSX.Element) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {ui}
    </MockedProvider>,
  )
