import { User } from "./types"

// eslint-disable-next-line import/prefer-default-export
export const testUser = (): User => ({
  id: "test",
  givenName: "name",
  familyName: "surname",
  email: "name@surname.com",
  created: new Date(),
})
