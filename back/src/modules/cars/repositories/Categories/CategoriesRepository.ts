import { CategoryModel, Category } from '../../infra/mongoose/entities/Category'

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository'

export default class CategoriesRepository implements ICategoriesRepository {
  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = await CategoryModel.create({
      name,
      description,
    })
    await category.save()

    return category
  }

  async list(): Promise<Category[]> {
    return await CategoryModel.find({})
  }

  async findByName(name: string): Promise<Category> {
    const category = await CategoryModel.findOne({
      name,
    })
    return category
  }
}
