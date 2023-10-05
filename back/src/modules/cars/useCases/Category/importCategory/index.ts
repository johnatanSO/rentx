import { ImportCategoryUseCase } from './ImportCategoryUseCase'
import { ImportCategoryController } from './ImportCategoryController'
import CategoriesRepository from '../../../repositories/Categories/CategoriesRepository'

const categoriesRepository = new CategoriesRepository()

const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository)

export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
)
