import { Car } from './Car'
import { User } from './User'

export interface Rental {
  _id: string
  startDate: Date | string
  endDate: Date | string
  expectedReturnDate: Date | string
  car: Car
  user: User
}
