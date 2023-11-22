import { CarImage } from './CarImage'
import { Category } from './Category'
import { Specification } from './Specification'

export interface Car {
  _id: string
  name: string
  images: CarImage[]
  licensePlate: string
  specifications: Specification[]
  dailyRate: number
  fineAmount: number
  brand: string
  category: Category
  categoryId: string
  transmission: string
  description: string
}
