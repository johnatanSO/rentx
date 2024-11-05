import { inject, injectable } from 'tsyringe'
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository'
import { Category } from '../../../infra/typeorm/entities/Category'

@injectable()
export class ListCategoriesUseCase {
  categoriesRepository: ICategoriesRepository
  constructor(
    @inject('CategoriesRepository') categoriesRepository: ICategoriesRepository,
  ) {
    this.categoriesRepository = categoriesRepository
  }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()
    return categories
  }
}
