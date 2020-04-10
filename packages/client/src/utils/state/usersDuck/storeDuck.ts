import { PayloadAction } from "@reduxjs/toolkit"
import { User } from "@djogger/test"
import Duck from "../Duck"

const initialState: User[] = []

const { actions, duck } = Duck.fromSlice({
  name: "users/store",
  initialState,
  reducers: {
    add: (users, action: PayloadAction<User>) => users.concat(action.payload),
    append: (users, action: PayloadAction<User[]>) =>
      users.concat(action.payload),
    update: (users, action: PayloadAction<User>) =>
      users.map((user) =>
        user.id === action.payload.id ? action.payload : user,
      ),
    delete: (users, action: PayloadAction<string>) =>
      users.filter((user) => user.id !== action.payload),
  },
})

export const usersSelector = duck.selector((state) => state)

export const addUser = actions.add
export const appendUsers = actions.append
export const updateUser = actions.update
export const deleteUser = actions.delete

export default duck
