import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ICreateCategoryDTO } from '../../../repositories/Categories/ICategoriesRepository'

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  constructor(newCategoryData: ICreateCategoryDTO) {
    Object.assign(newCategoryData)
  }
}
