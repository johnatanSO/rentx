import { Car } from './Car'

export interface Rental {
  _id: string
  startDate: Date
  endDate: Date
  car: Car
}
