import { createUser, createRandomUser } from "./usersDuck"

describe("Users duck", () => {
  test("Create random user", () => {
    const randomUserAction = createRandomUser()

    expect(randomUserAction.type).toBe(createUser.type)
    expect(randomUserAction.payload).toEqual(
      expect.objectContaining({
        givenName: expect.any(String),
        familyName: expect.any(String),
        email: expect.any(String),
      }),
    )
  })
})
