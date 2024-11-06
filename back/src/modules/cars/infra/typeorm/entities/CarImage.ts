import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ICreateImageDTO } from '../../../dtos/CarImage'
import { Car } from './Car'

@Entity('carimages')
export class CarImage {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column()
  carId: string

  @ManyToOne(() => Car, (car) => car.images)
  @JoinColumn({ name: 'carId' })
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
