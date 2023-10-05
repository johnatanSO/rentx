import { Model } from 'mongoose'
import { Car, CarModel } from '../../infra/mongoose/entities/Car'
import { ICarsRepository, ICreateNewCarDTO } from './ICarsRepository'

export class CarsRepository implements ICarsRepository {
  model: Model<Car> = CarModel
  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    specifications,
  }: ICreateNewCarDTO): Promise<Car> {
    const newCar = await this.model.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      specifications,
    })

    await newCar.save()

    return newCar
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return await this.model.findOne({ licensePlate })
  }

  async listAvaliable(
    categoryId?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    const cars = await this.model.find({
      avaliable: true,
      ...(brand ? { brand } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(name ? { name } : {}),
    })

    return cars
  }

  async findById(carId: string): Promise<Car> {
    return await this.model.findOne({ _id: carId })
  }
}
