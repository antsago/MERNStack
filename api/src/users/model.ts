import { model, Schema, Document } from "mongoose"
import { User } from "./types"

export interface UserModelType extends Omit<User, "id">, Document {}

const UserSchema: Schema = new Schema(
  {
    // public id
    id: {
      type: String,
      require: true,
      unique: true,
    },
    email: String,
    givenName: String,
    familyName: String,
  },
  { timestamps: { createdAt: "created" } },
)

export default model<UserModelType>("User", UserSchema)
