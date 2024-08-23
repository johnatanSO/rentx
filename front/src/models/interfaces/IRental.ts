import { ICar } from './ICar'
import { IUser } from './IUser'

export interface IRental {
  _id: string
  startDate: Date | string
  endDate: Date | string
  expectedReturnDate: Date | string
  car: ICar
  user: IUser
}
