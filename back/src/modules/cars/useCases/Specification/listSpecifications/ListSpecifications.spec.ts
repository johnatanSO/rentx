import { MockSpecificationsRepository } from '../../../repositories/Specifitacions/MockSpecificationsRepository'
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'

let listSpecificationsUseCase: ListSpecificationsUseCase

let mockSpecificationsRepository: MockSpecificationsRepository

describe('List specifications', () => {
  beforeEach(() => {
    mockSpecificationsRepository = new MockSpecificationsRepository()

    listSpecificationsUseCase = new ListSpecificationsUseCase(
      mockSpecificationsRepository,
    )
  })

  it('should be able list specifications', async () => {
    await mockSpecificationsRepository.create({
      name: 'Specification name',
      description: 'Specification description',
    })

    const specifications = await listSpecificationsUseCase.execute()

    expect(specifications.length).toBeGreaterThan(0)
  })
})
