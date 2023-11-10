import { MockCategoriesRepository } from './../../../repositories/Categories/MockCategoriesRepository'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

let listCategoriesUseCase: ListCategoriesUseCase

let mockCategoriesRepository: MockCategoriesRepository

describe('List categories', () => {
  beforeEach(() => {
    mockCategoriesRepository = new MockCategoriesRepository()

    listCategoriesUseCase = new ListCategoriesUseCase(mockCategoriesRepository)
  })

  it('should be able list categories', async () => {
    await mockCategoriesRepository.create({
      name: 'Category name',
      description: 'Category description',
    })

    const categories = await listCategoriesUseCase.execute()

    expect(categories.length).toBeGreaterThan(0)
  })
})
