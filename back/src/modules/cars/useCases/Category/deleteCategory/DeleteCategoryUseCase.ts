import { inject, injectable } from 'tsyringe'
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository'
import { AppError } from '../../../../../shared/errors/AppError'

@injectable()
export class DeleteCategoryUseCase {
  categoriesRepository: ICategoriesRepository
  constructor(
    @inject('CategoriesRepository') categoriesRepository: ICategoriesRepository,
  ) {
    this.categoriesRepository = categoriesRepository
  }

  async execute(categoryId: string): Promise<void> {
    if (!categoryId) throw new AppError('_id da categoria não enviado')

    await this.categoriesRepository.delete(categoryId)
  }
}
