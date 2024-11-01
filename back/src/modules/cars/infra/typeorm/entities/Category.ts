import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ICreateCategoryDTO } from '../../../repositories/Categories/ICategoriesRepository'
import { Car } from './Car'

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @OneToMany(() => Car, (car) => car._id)
  cars: Car[]

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  createdAt: Date

  constructor(newCategoryData: ICreateCategoryDTO) {
    Object.assign(this, newCategoryData)
  }
}
