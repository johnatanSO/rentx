import { CarImage } from './CarImage'
import { Specification } from './Specification'

export interface Car {
  _id: string
  name: string
  images: CarImage[]
  dailyRate: number
  specifications: Specification[]
  avaliable: boolean
  defaultImage: CarImage
  transmission: string
}
