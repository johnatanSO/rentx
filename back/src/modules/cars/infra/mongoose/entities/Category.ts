import mongoose, { Types } from 'mongoose'

export interface Category {
  _id?: string | Types.ObjectId
  name: string
  description: string
  createdAt: Date
}

const CategorySchema = new mongoose.Schema({
  name: { type: String, default: null },
  description: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
})

export const CategoryModel = mongoose.model<Category>(
  'Category',
  CategorySchema,
)
