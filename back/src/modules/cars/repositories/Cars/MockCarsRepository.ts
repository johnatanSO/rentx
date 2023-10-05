import { Car } from './../../infra/mongoose/entities/Car'
import { Types } from 'mongoose'
import { ICarsRepository, ICreateNewCarDTO } from './ICarsRepository'

export class MockCarsRepository implements ICarsRepository {
  cars: Car[] = []

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
    const newCar = {
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId: new Types.ObjectId(categoryId),
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      avaliable: true,
      specifications: specifications || null,
    }

    this.cars.push(newCar)

    return newCar
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.licensePlate === licensePlate)
  }

  async listAvaliable(
    categoryId: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (
        car.avaliable ||
        (brand && car.brand === brand) ||
        (categoryId && car.categoryId.toString() === categoryId.toString()) ||
        (name && car.name === name)
      ) {
        return car
      }
      return null
    })
  }

  async findById(carId: string): Promise<Car> {
    return this.cars.find((car) => car._id.toString() === carId)
  }
}
