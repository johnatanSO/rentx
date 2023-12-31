import { CarImage } from './CarImage'
import { Category } from './Category'
import { Specification } from './Specification'

export interface Car {
  _id: string
  name: string
  images: CarImage[]
  defaultImage: CarImage
  licensePlate: string
  specifications: Specification[]
  dailyRate: number
  fineAmount: number
  brand: string
  category: Category
  transmission: string
  description: string
  avaliable: boolean
  reasonUnavaliable?: string
}
