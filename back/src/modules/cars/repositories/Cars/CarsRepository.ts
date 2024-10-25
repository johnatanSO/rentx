import { Model } from 'mongoose'
import { Car, CarModel } from '../../infra/mongoose/entities/Car'
import { ICarsRepository, ICreateNewCarDTO } from './ICarsRepository'

// asa s
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
    transmission,
  }: ICreateNewCarDTO): Promise<Car> {
    const newCar = await this.model.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      category: categoryId,
      transmission,
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
        ...(categoryId ? { category: categoryId } : {}),
        ...(name ? { name: { $regex: name, $options: 'i' } } : {}),
      })
      .populate('specifications images defaultImage')

    return cars
  }

  async findById(carId: string): Promise<Car> {
    return await this.model
      .findOne({ _id: carId })
      .populate('specifications images category defaultImage')
  }

  async updateOne(_id: string, fields: any): Promise<void> {
    await this.model.updateOne({ _id }, { $set: { ...fields } })
  }

  async addImage(_id: string, imageId: string): Promise<void> {
    await this.model.updateOne({ _id }, { $push: { images: imageId } })
  }

  async listAll(): Promise<Car[]> {
    const allCars = await this.model
      .find()
      .populate('specifications images defaultImage')
    return allCars
  }

  async removeImage(carId: string, imageId: string): Promise<void> {
    await this.model.updateOne({ _id: carId }, { $pull: { images: imageId } })
  }

  async delete(carId: string): Promise<void> {
    await this.model.deleteOne({ _id: carId })
  }
}
