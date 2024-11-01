import { getRepository, Repository } from 'typeorm'
import { ICreateCategoryDTO } from '../../../dtos/Category'
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository'
import { Category } from '../entities/Category'

export class TypeormCategoriesRepository implements ICategoriesRepository {
  repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const newCategory = this.repository.create({ name, description })

    return await this.repository.save(newCategory)
  }

  async list(): Promise<Category[]> {
    return await this.repository.find()
  }

  async delete(categoryId: string): Promise<void> {
    await this.repository.delete(categoryId)
  }

  async findByName(name: string): Promise<Category> {
    return await this.repository.findOneBy({ name })
  }

  async findById(categoryId: string): Promise<Category> {
    return await this.repository.findOneBy({ _id: categoryId })
  }

  async update(data: Category): Promise<void> {
    await this.repository.save(data)
  }
}
