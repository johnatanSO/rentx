import { ICreateRentalDTO, IListRentalsDTO } from '../dtos/Rental'
import { Rental } from '../infra/typeorm/entities/Rental'

export interface IRentalsRepository {
  findOpenRentalByCar(carId: string): Promise<Rental>
  findOpenRentalByUser(userId: string): Promise<Rental>
  findById(rentalId: string): Promise<Rental>
  create(createRentalData: ICreateRentalDTO): Promise<Rental>
  list(userId: string): Promise<Rental[]>
  listAll(listRentalsData: IListRentalsDTO): Promise<Rental[]>
  update(data: Rental): Promise<void>
}
