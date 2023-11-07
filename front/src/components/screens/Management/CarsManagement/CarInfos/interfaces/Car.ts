import { CarImage } from './CarImage'

export interface Car {
  _id: string
  name: string
  images: CarImage[]
  licensePlate: string
}
