import mongoose, { Types } from 'mongoose'

export interface Car {
  _id: Types.ObjectId
  name: string
  description: string
  dailyRate: number
  avaliable: boolean
  licensePlate: string
  fineAmount: number
  brand: string
  categoryId: Types.ObjectId
  createdAt: Date
  specifications: Types.ObjectId[]
}

const CarSchema = new mongoose.Schema({
  name: { type: String, default: null },
  description: { type: String, default: null },
  dailyRate: { type: Number, default: null },
  avaliable: { type: Boolean, default: true },
  licensePlate: { type: String, default: null },
  fineAmount: { type: Number, default: null },
  brand: { type: String, default: null },
  categoryId: { type: 'ObjectId', ref: 'Category', default: null },
  createdAt: { type: Date, default: Date.now },
  specifications: [{ type: 'ObjectId', ref: 'Specification', default: null }],
})

export const CarModel = mongoose.model<Car>('Car', CarSchema)
