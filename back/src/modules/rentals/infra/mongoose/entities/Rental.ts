import mongoose, { Types } from 'mongoose'
import { Car } from '../../../../cars/infra/mongoose/entities/Car'

export interface Rental {
  _id: Types.ObjectId
  carId: Types.ObjectId
  car: Car | null
  userId: Types.ObjectId
  startDate: Date
  endDate: Date
  expectedReturnDate: Date
  total: number
  createdAt: Date
  updateAt: Date
}

const RentalSchema = new mongoose.Schema({
  carId: { type: 'ObjectId', ref: 'Car', default: null },
  car: { type: 'ObjectId', ref: 'Car', default: null },
  userId: { type: 'ObjectId', ref: 'User', default: null },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: null },
  expectedReturnDate: { type: Date, default: null },
  total: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
})

export const RentalModel = mongoose.model<Rental>('Rental', RentalSchema)
