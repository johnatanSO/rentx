import { Car } from '../../infra/mongoose/entities/Car'

export interface ICreateNewCarDTO {
  name: string
  description: string
  dailyRate: number
  licensePlate: string
  fineAmount: number
  brand: string
  categoryId: string
}

export interface ICarsRepository {
  create: (newCarData: ICreateNewCarDTO) => Promise<Car>
  findByLicensePlate: (licensePlate: string) => Promise<Car>
  listAvaliable: (
    categoryId?: string,
    brand?: string,
    name?: string,
  ) => Promise<Car[]>
  findById: (carId: string) => Promise<Car>
  updateOne: (_id: string, fields: any) => Promise<void>
  addImage: (_id: string, imageId: string) => Promise<void>
}
