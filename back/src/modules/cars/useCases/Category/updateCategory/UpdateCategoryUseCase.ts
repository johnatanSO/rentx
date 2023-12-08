import { inject, injectable } from 'tsyringe'
import { ICategoriesRepository } from '../../../repositories/Categories/ICategoriesRepository'
import { AppError } from '../../../../../shared/errors/AppError'

interface IRequest {
  categoryId: string
  name: string
  description: string
}

@injectable()
export class UpdateCategoryUseCase {
  categoriesRepository: ICategoriesRepository
  constructor(
    @inject('CategoriesRepository') categoriesRepository: ICategoriesRepository,
  ) {
    this.categoriesRepository = categoriesRepository
  }

  async execute({ categoryId, name, description }: IRequest): Promise<void> {
    if (!categoryId) throw new AppError('_id da categoria não enviado')

    const category = await this.categoriesRepository.findById(categoryId)

    if (!category) throw new AppError('_id da categoria inválido')

    await this.categoriesRepository.update(categoryId, {
      name,
      description,
    })
  }
}
