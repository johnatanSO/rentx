import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Car } from '../../../../cars/infra/typeorm/entities/Car'
import { User } from '../../../../accounts/infra/typeorm/entities/User'
import { ICreateRentalDTO } from '../../../dtos/Rental'

@Entity('rental')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @ManyToOne(() => Car, (car) => car._id)
  car: Car

  @ManyToOne(() => User, (user) => user._id)
  user: User

  @Column()
  startDate: Date

  @Column()
  endDate: Date

  @Column()
  expectedReturnDate: Date

  @Column()
  total: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateAt: Date

  constructor(newRentalData: ICreateRentalDTO) {
    Object.assign(this, newRentalData)
  }
}
