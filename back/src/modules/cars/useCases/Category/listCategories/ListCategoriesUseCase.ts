import { Category } from '../../../infra/mongoose/entities/Category'
import { ICategoriesRepository } from '../../../repositories/Categories/ICategoriesRepository'

export class ListCategoriesUseCase {
  categoriesRepository: ICategoriesRepository
  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()
    return categories
  }
}
