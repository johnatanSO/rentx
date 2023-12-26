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
    transmission,
  }: ICreateNewCarDTO): Promise<Car> {
    const newCar = {
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      transmission,
      category: new Types.ObjectId(categoryId),
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      avaliable: true,
      specifications: null,
      images: null,
      defaultImage: null,
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
        (categoryId && car.category.toString() === categoryId.toString()) ||
        (name && car.name === name)
      ) {
        return car
      }
      return null
    })
  }

  async listAll(): Promise<Car[]> {
    return this.cars
  }

  async findById(carId: string): Promise<Car> {
    return this.cars.find((car) => car._id.toString() === carId)
  }

  async updateOne(_id: string, fields: any): Promise<void> {
    const index = this.cars.findIndex((car) => car._id.toString() === _id)

    if (index !== -1) {
      this.cars[index] = {
        ...this.cars[index],
        ...fields,
      }
    }
  }

  async addImage(_id: string, imageId: string): Promise<void> {
    const index = this.cars.findIndex((car) => car._id.toString() === _id)

    if (index !== -1) {
      this.cars[index] = {
        ...this.cars[index],
        images: [
          ...(this.cars[index].images as Types.ObjectId[]),
          new Types.ObjectId(imageId),
        ],
      }
    }
  }

  async removeImage(carId: string, imageId: string): Promise<void> {
    const car = this.cars.find((car) => car._id.toString() === carId)

    const newImages = []
    const carIndex = this.cars.findIndex((car) => car._id.toString() === carId)

    this.cars[carIndex] = {
      ...this.cars[carIndex],
      images: newImages.map((image) => image._id),
    }
  }
}
