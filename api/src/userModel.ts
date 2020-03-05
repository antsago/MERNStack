import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    //public id
    id: {
      type: String,
      require: true,
      unique: true
    },
    email: String,
    givenName: String,
    familyName: String
  },
  { timestamps: { createdAt: 'created' } }
)

export default mongoose.model('User', UserSchema)
