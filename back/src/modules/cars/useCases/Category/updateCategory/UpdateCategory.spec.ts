import { Types } from 'mongoose'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockCategoriesRepository } from '../../../repositories/Categories/MockCategoriesRepository'
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase'

let mockCategoriesRepository: MockCategoriesRepository

let updateCategoryUseCase: UpdateCategoryUseCase

describe('Update category', () => {
  beforeEach(() => {
    mockCategoriesRepository = new MockCategoriesRepository()

    updateCategoryUseCase = new UpdateCategoryUseCase(mockCategoriesRepository)
  })

  it('should not be able update category infos if categoryId not sent', async () => {
    await expect(
      updateCategoryUseCase.execute({
        categoryId: null,
        description: 'teste',
        name: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update category infos if categoryId id invalid', async () => {
    await expect(
      updateCategoryUseCase.execute({
        categoryId: new Types.ObjectId().toString(),
        description: 'teste',
        name: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able update category infos ', async () => {
    const category = await mockCategoriesRepository.create({
      name: 'test',
      description: 'test',
    })

    const newData = {
      name: 'new name',
      description: 'new description',
    }

    await updateCategoryUseCase.execute({
      categoryId: category._id.toString(),
      ...newData,
    })

    const updatedCategory = await mockCategoriesRepository.findById(
      category._id.toString(),
    )

    expect(updatedCategory.name).toBe(newData.name)
    expect(updatedCategory.description).toBe(newData.description)
  })
})
