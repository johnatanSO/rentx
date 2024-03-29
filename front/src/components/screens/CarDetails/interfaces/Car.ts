import { CarImage } from './CarImage'
import { Specification } from './Specification'

export interface Car {
  _id: string
  name: string
  images: CarImage[]
  defaultImage: CarImage
  dailyRate: number
  fineAmount: number
  specifications: Specification[]
  description: string
  licensePlate: string
  category: {
    _id: string
    name: string
    description: string
  }
}
