import { ICarImage } from './ICarImage'
import { ICategory } from './ICategory'
import { ISpecification } from './ISpecification'

export interface ICar {
  _id: string
  name: string
  images: ICarImage[]
  defaultImage: ICarImage
  dailyRate: number
  fineAmount: number
  specifications: ISpecification[]
  description: string
  licensePlate: string
  category: ICategory
}
