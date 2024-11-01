import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ICreateCategoryDTO } from '../../../dtos/Category'

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  _id: string

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
