import { Model } from 'mongoose'
import { Car, CarModel } from '../../infra/mongoose/entities/Car'
import { ICarsRepository, ICreateNewCarDTO } from './ICarsRepository'

export class CarsRepository implements ICarsRepository {
  private model: Model<Car>
  constructor() {
    this.model = CarModel
  }

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: ICreateNewCarDTO): Promise<Car> {
    const newCar = await this.model.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
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
    const cars = await this.model
      .find({
        avaliable: true,
        ...(brand ? { brand } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(name ? { name } : {}),
      })
      .populate('specifications images')

    return cars
  }

  async findById(carId: string): Promise<Car> {
    return await this.model
      .findOne({ _id: carId })
      .populate('specifications images')
  }

  async updateOne(_id: string, fields: any): Promise<void> {
    await this.model.updateOne({ _id }, { $set: { ...fields } })
  }

  async addImage(_id: string, imageId: string): Promise<void> {
    await this.model.updateOne({ _id }, { $push: { images: imageId } })
  }
}
