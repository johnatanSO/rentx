import { Model } from 'mongoose'
import { CarImage, CarImageModel } from '../../infra/mongoose/entities/CarImage'
import { ICarsImagesRepository } from './ICarsImagesRepository'

export class CarsImagesRepository implements ICarsImagesRepository {
  private model: Model<CarImage> = CarImageModel

  async create(carId: string, imageName: string): Promise<CarImage> {
    const newCarImage = await this.model.create({
      carId,
      imageName,
    })

    await newCarImage.save()
    return newCarImage
  }
}
