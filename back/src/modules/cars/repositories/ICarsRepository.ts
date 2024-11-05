import { ICreateNewCarDTO } from '../dtos/Car'
import { Car } from '../infra/typeorm/entities/Car'

export interface ICarsRepository {
  create: (data: ICreateNewCarDTO) => Promise<Car>
  findByLicensePlate: (licensePlate: string) => Promise<Car>
  listAvaliable: (
    categoryId?: string,
    brand?: string,
    name?: string,
  ) => Promise<Car[]>
  findById: (carId: string) => Promise<Car>
  update: (data: Car) => Promise<void>
  listAll: () => Promise<Car[]>
  delete(carId: string): Promise<void>
}
