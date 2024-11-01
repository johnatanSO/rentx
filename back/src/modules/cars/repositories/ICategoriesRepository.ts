import { ICreateCategoryDTO } from '../dtos/Category'
import { Category } from '../infra/typeorm/entities/Category'

export interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>
  list(): Promise<Category[]>
  delete(categoryId: string): Promise<void>
  findByName(name: string): Promise<Category>
  findById(categoryId: string): Promise<Category>
  update(category: Category): Promise<void>
}
