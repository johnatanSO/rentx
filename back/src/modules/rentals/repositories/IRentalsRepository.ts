import { ICreateRentalDTO } from '../dtos/Rental'
import { Rental } from '../infra/mongoose/entities/Rental'

export interface IListRentalsDTO {
  userId: string
  carId: string
  filterStartDate: string
  filterEndDate: string
}

export interface IRentalsRepository {
  findOpenRentalByCar(carId: string): Promise<Rental>
  findOpenRentalByUser(userId: string): Promise<Rental>
  findById(rentalId: string): Promise<Rental>
  create(createRentalData: ICreateRentalDTO): Promise<Rental>
  list(userId: string): Promise<Rental[]>
  listAll(listRentalsData: IListRentalsDTO): Promise<Rental[]>
  finalizeRental(rentalId: string, totalValue: number): Promise<void>
  update(rentalId: string, fields: any): Promise<void>
}
