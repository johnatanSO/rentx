import 'reflect-metadata'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockCategoriesRepository } from '../../../repositories/Categories/MockCategoriesRepository'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let mockCategoriesRepository: MockCategoriesRepository

describe('Create category ', () => {
  beforeEach(() => {
    mockCategoriesRepository = new MockCategoriesRepository()
    createCategoryUseCase = new CreateCategoryUseCase(mockCategoriesRepository)
  })

  it('should be able to create a new category', async () => {
    const newCategory = await createCategoryUseCase.execute({
      name: 'Teste jest',
      description: 'Teste de implementação jest',
    })

    expect(newCategory).toHaveProperty('_id')
  })

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: 'Teste jest',
        description: 'Categoria com o mesmo nome',
      })

      await createCategoryUseCase.execute({
        name: 'Teste jest',
        description: 'Categoria com o mesmo nome',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
