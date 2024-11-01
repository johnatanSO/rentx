import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ICreateImageDTO } from '../../../repositories/CarsImages/ICarsImagesRepository'
import { Car } from './Car'

@Entity('carimage')
export class CarImage {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @OneToOne(() => Car, (car) => car._id)
  car: Car

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
