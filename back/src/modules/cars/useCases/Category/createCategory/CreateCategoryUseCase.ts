import { ICreateCategoryDTO } from './../../../repositories/Categories/ICategoriesRepository'
import { Category } from '../../../infra/mongoose/entities/Category'
import { ICategoriesRepository } from '../../../repositories/Categories/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../../shared/errors/AppError'

@injectable()
export class CreateCategoryUseCase {
  categoriesRepository: ICategoriesRepository
  constructor(
    @inject('CategoriesRepository') categoriesRepository: ICategoriesRepository,
  ) {
    this.categoriesRepository = categoriesRepository
  }

  async execute({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const categoryAlreadyExists =
      !!(await this.categoriesRepository.findByName(name))

    if (categoryAlreadyExists) {
      throw new AppError('Esta categoria já existe!')
    }

    const newCategory = await this.categoriesRepository.create({
      name,
      description,
    })

    return newCategory
  }
}
