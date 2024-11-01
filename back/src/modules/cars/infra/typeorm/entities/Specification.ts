import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ICreateSpecificationDTO } from '../../../repositories/Specifitacions/ISpecificationsRepository'
import { Car } from './Car'

@Entity('specification')
export class Specification {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @ManyToMany(() => Car, (car) => car._id)
  cars: Car[]

  constructor(newSpecificationData: ICreateSpecificationDTO) {
    Object.assign(this, newSpecificationData)
  }
}
