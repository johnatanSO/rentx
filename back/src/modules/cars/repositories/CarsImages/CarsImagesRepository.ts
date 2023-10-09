import { Model } from 'mongoose'
import { CarImage, CarImageModel } from '../../infra/mongoose/entities/CarImage'
import { ICarsImagesRepository, ICreateImageDTO } from './ICarsImagesRepository'

export class CarsImagesRepository implements ICarsImagesRepository {
  private model: Model<CarImage> = CarImageModel

  async create({ carId, imageName, path }: ICreateImageDTO): Promise<CarImage> {
    const newCarImage = await this.model.create({
      carId,
      imageName,
      path,
    })

    await newCarImage.save()
    return newCarImage
  }
}
