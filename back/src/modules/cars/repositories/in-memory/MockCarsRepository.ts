import { ICreateNewCarDTO } from '../../dtos/Car'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

export class MockCarsRepository implements ICarsRepository {
  cars: Car[] = []

  async update(data: Car): Promise<void> {
    const index = this.cars.findIndex(
      (user) => user._id.toString() === data._id.toString(),
    )

    if (index !== -1) {
      this.cars[index] = {
        ...this.cars[index],
        ...data,
      }
    }
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
    const newCar = new Car({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      transmission,
    })

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

  async addImage(_id: string, imageId: string): Promise<void> {
    const index = this.cars.findIndex((car) => car._id.toString() === _id)

    if (index !== -1) {
      this.cars[index] = {
        ...this.cars[index],
        images: [...(this.cars[index].images as any), imageId],
      }
    }
  }

  async removeImage(carId: string, imageId: string): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car._id.toString() === carId)

    const newImages = this.cars[carIndex].images.filter(
      (image) => (image as any) !== imageId,
    )

    this.cars[carIndex] = {
      ...this.cars[carIndex],
      images: newImages,
    }
  }

  async delete(carId: string): Promise<void> {
    this.cars = this.cars.filter((car) => car._id.toString() !== carId)
  }
}
