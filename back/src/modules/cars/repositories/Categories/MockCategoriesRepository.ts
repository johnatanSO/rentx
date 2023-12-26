import { Types } from 'mongoose'
import { Category } from '../../infra/mongoose/entities/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository'

export class MockCategoriesRepository implements ICategoriesRepository {
  categories: Category[]
  constructor() {
    this.categories = []
  }

  async delete(categoryId: string): Promise<void> {
    const newCategories = this.categories.filter(
      (category) => category._id.toString() !== categoryId,
    )
    this.categories = newCategories
  }

  async findById(categoryId: string): Promise<Category> {
    const category = this.categories.find(
      (category) => category._id.toString() === categoryId,
    )
    return category
  }

  async update(categoryId: string, fields: any): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category._id.toString() === categoryId,
    )

    this.categories[categoryIndex] = {
      ...this.categories[categoryIndex],
      ...fields,
    }
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const newCategory = {
      name,
      description,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
    }

    this.categories.push(newCategory)

    return newCategory
  }

  async list(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name)
    return category
  }
}
