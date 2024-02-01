import { Types } from 'mongoose'
import { CarImage } from '../../infra/mongoose/entities/CarImage'
import { ICarsImagesRepository, ICreateImageDTO } from './ICarsImagesRepository'

export class MockCarsImagesRepository implements ICarsImagesRepository {
  carsImages: CarImage[] = []

  async create({ carId, imageName, path }: ICreateImageDTO): Promise<CarImage> {
    const newCarImage = {
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      carId: new Types.ObjectId(carId),
      imageName,
      path,
    }

    this.carsImages.push(newCarImage)

    return newCarImage
  }

  async delete(imageId: string): Promise<void> {
    this.carsImages = this.carsImages.filter(
      (carImage) => carImage._id.toString() !== imageId,
    )
  }

  async findById(imageId: string): Promise<CarImage> {
    return this.carsImages.find(
      (carImage) => carImage._id.toString() === imageId,
    )
  }
}
