import { CarImage } from './CarImage'
import { Specification } from './Specification'

export interface Car {
  _id: string
  name: string
  images: CarImage[]
  licensePlate: string
  specifications: Specification[]
}
