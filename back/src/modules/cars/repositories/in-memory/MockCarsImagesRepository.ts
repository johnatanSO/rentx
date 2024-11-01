import { CarImage } from '../../infra/typeorm/entities/CarImage'
import { ICarsImagesRepository } from '../ICarsImagesRepository'
import { ICreateImageDTO } from '../../dtos/CarImage'

export class MockCarsImagesRepository implements ICarsImagesRepository {
  carsImages: CarImage[] = []

  async create({ carId, imageName, path }: ICreateImageDTO): Promise<CarImage> {
    const newCarImage = new CarImage({
      carId,
      imageName,
      path,
    })

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
