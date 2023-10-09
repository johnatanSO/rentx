import { CarImage } from '../../infra/mongoose/entities/CarImage'

export interface ICreateImageDTO {
  carId: string
  imageName: string
  path: string
}

export interface ICarsImagesRepository {
  create(data: ICreateImageDTO): Promise<CarImage>
}
