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

  async delete(categoryId: string): Promise<void> {
    await this.model.deleteOne({ _id: categoryId })
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.model.findOne({
      name,
    })
    return category
  }

  async findById(categoryId: string): Promise<Category> {
    const category = await this.model.findById(categoryId)
    return category
  }

  async update(categoryId: string, fields: any): Promise<void> {
    await this.model.updateOne({ _id: categoryId }, fields)
  }
}
