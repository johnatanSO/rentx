import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ICreateImageDTO } from '../../../repositories/CarsImages/ICarsImagesRepository'

@Entity('carimage')
export class CarImage {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  constructor(newCarImage: ICreateImageDTO) {
    Object.assign(newCarImage)
  }
}
