import { Category } from '../../infra/mongoose/entities/Category'

export interface ICreateCategoryDTO {
  name: string
  description: string
}

export interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>
  list(): Promise<Category[]>
  delete(categoryId: string): Promise<void>
  findByName(name: string): Promise<Category>
  findById(categoryId: string): Promise<Category>
  update(categoryId: string, fields: any): Promise<void>
}
