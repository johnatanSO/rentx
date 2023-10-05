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

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const newCategory = {
      name,
      description,
      _id: (Math.random() * 75678).toString(),
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
