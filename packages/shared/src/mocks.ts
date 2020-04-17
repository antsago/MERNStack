import { User, UserInput } from "./types"

// eslint-disable-next-line import/prefer-default-export
export const testUser = (): User => ({
  id: "test",
  givenName: "name",
  familyName: "surname",
  email: "name@surname.com",
  created: new Date(),
})

export const toUserInput = (user: User): UserInput => ({
  givenName: user.givenName,
  familyName: user.familyName,
  email: user.email,
})
