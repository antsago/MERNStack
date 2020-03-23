import { v4 as uuid } from "uuid"
import UserModel, { UserModelType } from "./model"
import { User, UserInput } from "./types"

export default class UserRepository {
  constructor(private userModel = UserModel) {}

  private static toPlainObject(mongoUser: UserModelType): User {
    return {
      id: mongoUser.id,
      email: mongoUser.email,
      givenName: mongoUser.givenName,
      familyName: mongoUser.familyName,
      created: mongoUser.created,
    }
  }

  private static toPlainObjects(arrayUsers: UserModelType[]): User[] {
    return arrayUsers.map((user) => UserRepository.toPlainObject(user))
  }

  async getUsers(): Promise<User[]> {
    return UserRepository.toPlainObjects(await this.userModel.find())
  }

  async getUser(id: string): Promise<User> {
    return UserRepository.toPlainObject(await this.userModel.findOne({ id }))
  }

  async createUser(user: UserInput): Promise<User> {
    const id = uuid()
    return UserRepository.toPlainObject(
      await this.userModel.create({ ...user, id }),
    )
  }

  async updateUser(id: string, user: UserInput): Promise<User> {
    return UserRepository.toPlainObject(
      await this.userModel.findOneAndUpdate(
        { id },
        { $set: user },
        { new: true },
      ),
    )
  }

  async deleteUser(id: string): Promise<User> {
    return UserRepository.toPlainObject(
      await this.userModel.findOneAndDelete({ id }),
    )
  }
}
