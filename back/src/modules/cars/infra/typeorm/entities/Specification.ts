import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ICreateSpecificationDTO } from '../../../dtos/Specification'

@Entity('specification')
export class Specification {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  createdAt: Date

  constructor(newSpecificationData: ICreateSpecificationDTO) {
    Object.assign(this, newSpecificationData)
  }
}
