import { getRepository, Repository } from 'typeorm'
import { ICreateImageDTO } from '../../../dtos/CarImage'
import { ICarsImagesRepository } from '../../../repositories/ICarsImagesRepository'
import { CarImage } from '../entities/CarImage'

export class TypeormCarsImagesRepository implements ICarsImagesRepository {
  repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  async create({ carId, imageName, path }: ICreateImageDTO): Promise<CarImage> {
    const newCarImage = this.repository.create({ carId, imageName, path })

    return await this.repository.save(newCarImage)
  }

  async delete(imageId: string): Promise<void> {
    await this.repository.delete(imageId)
  }

  async findById(imageId: string): Promise<CarImage> {
    return await this.repository.findOneBy({ _id: imageId })
  }
}
