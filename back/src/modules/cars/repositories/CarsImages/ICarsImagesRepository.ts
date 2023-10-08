import { CarImage } from '../../infra/mongoose/entities/CarImage'

export interface ICarsImagesRepository {
  create(carId: string, imageName: string): Promise<CarImage>
}
