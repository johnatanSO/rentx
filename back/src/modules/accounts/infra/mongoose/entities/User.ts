import mongoose, { Types } from 'mongoose'

export interface IUser {
  _id: string | Types.ObjectId
  name: string
  password: string
  email: string
  driverLicense: string
  isAdmin: boolean
  createdAt: Date
  avatar: string
}

const UserSchema = new mongoose.Schema({
  name: { type: String, default: null },
  password: { type: String, default: null },
  email: { type: String, default: null },
  driverLicense: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  avatar: { type: String, default: null },
})

export const UserModel = mongoose.model<IUser>('User', UserSchema)
