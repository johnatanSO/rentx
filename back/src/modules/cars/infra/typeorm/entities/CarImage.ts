import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ICreateImageDTO } from '../../../dtos/CarImage'

@Entity('carimage')
export class CarImage {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column()
  carId: string

  @Column()
  imageName: string

  @CreateDateColumn()
  createdAt: Date

  @Column()
  path: string

  constructor(newCarImage: ICreateImageDTO) {
    Object.assign(this, newCarImage)
  }
}
