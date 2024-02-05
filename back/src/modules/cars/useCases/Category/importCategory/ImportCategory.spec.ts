import { MockCategoriesRepository } from './../../../repositories/Categories/MockCategoriesRepository'
import { AppError } from '../../../../../shared/errors/AppError'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

let mockCategoriesRepository: MockCategoriesRepository

let importCategoryUseCase: ImportCategoryUseCase

describe('Import categories', () => {
  beforeEach(() => {
    mockCategoriesRepository = new MockCategoriesRepository()

    importCategoryUseCase = new ImportCategoryUseCase(mockCategoriesRepository)
  })

  it('should not be able import categories if file not sent', async () => {
    await expect(importCategoryUseCase.execute(null)).rejects.toBeInstanceOf(
      AppError,
    )
  })

  /* it('should be able import categories', async () => {
    const createCategory = jest.spyOn(mockCategoriesRepository, 'create')

    await importCategoryUseCase.execute({
      buffer: undefined,
      destination: undefined,
      fieldname: undefined,
      filename: 'categories',
      mimetype: undefined,
      originalname: 'categoriesfile',
      path: 'fake/categories',
      size: undefined,
      stream: undefined,
      encoding: undefined,
    })

    expect(createCategory).toHaveBeenCalled()
  }) */
})
