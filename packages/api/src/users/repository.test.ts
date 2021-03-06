import { Model } from "mongoose"
import UserRepository from "./repository"
import { UserModelType } from "./model"

describe("User repository", () => {
  test("Create user assigns an id", async () => {
    const modelMock = { create: jest.fn().mockResolvedValue({ id: "mock" }) }

    const repository = new UserRepository(
      (modelMock as unknown) as Model<UserModelType>,
    )

    const user = { givenName: "test" }
    await repository.createUser(user)

    expect(modelMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...user,
        id: expect.any(String),
      }),
    )
  })
})
