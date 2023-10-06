import { inject, injectable } from 'tsyringe'
import { Category } from '../../../infra/mongoose/entities/Category'
import { ICategoriesRepository } from '../../../repositories/Categories/ICategoriesRepository'

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
