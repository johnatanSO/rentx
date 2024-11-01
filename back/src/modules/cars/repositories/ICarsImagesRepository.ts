import { ICreateImageDTO } from '../dtos/CarImage'
import { CarImage } from '../infra/typeorm/entities/CarImage'

export interface ICarsImagesRepository {
  create(data: ICreateImageDTO): Promise<CarImage>
  delete(imageId: string): Promise<void>
  findById(imageId: string): Promise<CarImage>
}
