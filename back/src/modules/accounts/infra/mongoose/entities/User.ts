import mongoose, { Types } from 'mongoose'
import { Car } from '../../../../cars/infra/mongoose/entities/Car'

export interface IUser {
  _id: Types.ObjectId
  name: string
  password: string
  email: string
  driverLicense: string
  isAdmin: boolean
  createdAt: Date
  avatar: string
  favoriteCars: Types.ObjectId[] | Car[]
}

const UserSchema = new mongoose.Schema({
  name: { type: String, default: null },
  password: { type: String, default: null },
  email: { type: String, default: null },
  driverLicense: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  avatar: { type: String, default: null },
  favoriteCars: [{ type: 'ObjectId', ref: 'Car', default: null }],
})

export const UserModel = mongoose.model<IUser>('User', UserSchema)
