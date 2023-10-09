import mongoose, { Types } from 'mongoose'

export interface CarImage {
  _id: Types.ObjectId
  imageName: string
  carId: Types.ObjectId
  createdAt: Date
  path: string
}

const CarImageSchema = new mongoose.Schema({
  imageName: { type: String, default: null },
  carId: { type: 'ObjectId', ref: 'Car', default: null },
  createdAt: { type: Date, default: Date.now },
  path: { type: String, default: null },
})

export const CarImageModel = mongoose.model<CarImage>(
  'CarImage',
  CarImageSchema,
)
