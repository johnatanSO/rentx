import { Model } from 'mongoose'
import { CategoryModel, Category } from '../../infra/mongoose/entities/Category'

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository'

export default class CategoriesRepository implements ICategoriesRepository {
  private model: Model<Category>
  constructor() {
    this.model = CategoryModel
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = await this.model.create({
      name,
      description,
    })

    await category.save()

    return category
  }

  async list(): Promise<Category[]> {
    return await this.model.find({})
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.model.findOne({
      name,
    })
    return category
  }
}
