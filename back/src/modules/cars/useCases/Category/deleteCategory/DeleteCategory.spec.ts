import { AppError } from '../../../../../shared/errors/AppError'
import { MockCategoriesRepository } from '../../../repositories/Categories/MockCategoriesRepository'
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase'

let mockCategoriesRepository: MockCategoriesRepository

let deleteCategoryUseCase: DeleteCategoryUseCase

describe('Delete category', () => {
  beforeEach(() => {
    mockCategoriesRepository = new MockCategoriesRepository()

    deleteCategoryUseCase = new DeleteCategoryUseCase(mockCategoriesRepository)
  })

  it('should not be able delete category if categoryId not sent', async () => {
    await expect(deleteCategoryUseCase.execute(null)).rejects.toBeInstanceOf(
      AppError,
    )
  })

  it('should be able delete category ', async () => {
    const category = await mockCategoriesRepository.create({
      name: 'test',
      description: 'test',
    })

    await deleteCategoryUseCase.execute(category._id.toString())

    const undefinedCaregory = await mockCategoriesRepository.findById(
      category._id.toString(),
    )

    expect(undefinedCaregory).toBeUndefined()
  })
})
