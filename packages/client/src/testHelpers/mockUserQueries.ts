import { User, testUser, toUserInput } from "@mernstack/shared"
import { CREATE_USER } from "../utils/state/users/CreateUser"
import { GET_USERS } from "../utils/state/users/GetUsers"
import { UPDATE_USER } from "../utils/state/users/UpdateUser"
import { DELETE_USER } from "../utils/state/users/DeleteUser"

export const createUserQuery = (user: User) => ({
  request: {
    query: CREATE_USER,
    variables: { user: toUserInput(user) },
  },
  result: { data: { createUser: user } },
})

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

export const updateUserQuery = (updatedUser: User) => ({
  request: {
    query: UPDATE_USER,
    variables: { id: updatedUser.id, user: toUserInput(updatedUser) },
  },
  result: { data: { updateUser: updatedUser } },
})

export const deleteUserQuery = (id: string) => ({
  request: {
    query: DELETE_USER,
    variables: { id },
  },
  result: { data: { deleteUser: { id } } },
})
