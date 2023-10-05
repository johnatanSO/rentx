import { ListCategoriesUseCase } from './ListCategoriesUseCase'
import { ListCategoriesController } from './ListCategoriesController'
import CategoriesRepository from '../../../repositories/Categories/CategoriesRepository'

const categoriesRepository = new CategoriesRepository()

const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)

export const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
)
