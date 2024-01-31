import mongoose, { Types } from 'mongoose'
import { CarImage } from './CarImage'
import { Specification } from './Specification'
import { Category } from './Category'

export interface Car {
  _id: Types.ObjectId
  name: string
  description: string
  dailyRate: number
  avaliable: boolean
  licensePlate: string
  fineAmount: number
  brand: string
  category: Types.ObjectId | Category
  createdAt: Date
  images: CarImage[]
  defaultImage: CarImage
  specifications: Types.ObjectId[] | Specification[]
  reasonUnavaliable?: string
  transmission: string
}

const CarSchema = new mongoose.Schema({
  name: { type: String, default: null },
  description: { type: String, default: null },
  dailyRate: { type: Number, default: null },
  avaliable: { type: Boolean, default: true },
  licensePlate: { type: String, default: null },
  fineAmount: { type: Number, default: null },
  brand: { type: String, default: null },
  category: { type: 'ObjectId', ref: 'Category', default: null },
  createdAt: { type: Date, default: Date.now },
  specifications: [{ type: 'ObjectId', ref: 'Specification', default: null }],
  images: [{ type: 'ObjectId', ref: 'CarImage', default: null }],
  defaultImage: { type: 'ObjectId', ref: 'CarImage', default: null },
  transmission: { type: String, default: null },
  reasonUnavaliable: { type: String, default: null },
})

export const CarModel = mongoose.model<Car>('Car', CarSchema)
