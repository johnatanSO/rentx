import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Car } from '../../../../cars/infra/typeorm/entities/Car'
import { User } from '../../../../accounts/infra/typeorm/entities/User'
import { ICreateRentalDTO } from '../../../dtos/Rental'

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column()
  carId: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'carId' })
  car: Car

  @Column()
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  startDate: string

  @Column()
  endDate: string

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
