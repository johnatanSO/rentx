import { CarImage } from './CarImage'
import { Specification } from './Specification'

export interface Car {
  _id: string
  name: string
  defaultImage: CarImage
  dailyRate: number
  specifications: Specification[]
}
