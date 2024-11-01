import { Types } from 'mongoose'
import { Category } from '../../infra/typeorm/entities/Category'
import { ICategoriesRepository } from '../ICategoriesRepository'
import { ICreateCategoryDTO } from '../../dtos/Category'

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

  async update(data: Category): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category._id.toString() === data._id,
    )

    this.categories[categoryIndex] = {
      ...this.categories[categoryIndex],
      ...data,
    }
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const newCategory = new Category({
      name,
      description,
    })

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
