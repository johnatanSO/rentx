import { Rental } from '../infra/mongoose/entities/Rental'

export interface ICreateRentalDTO {
  userId: string
  carId: string
  expectedReturnDate: Date
}

export interface IRentalsRepository {
  findOpenRentalByCar(carId: string): Promise<Rental>
  findOpenRentalByUser(userId: string): Promise<Rental>
  findById(rentalId: string): Promise<Rental>
  create(createRentalData: ICreateRentalDTO): Promise<Rental>
  list(userId: string): Promise<Rental[]>
  finalizeRental(rentalId: string, totalValue: number): Promise<void>
}
