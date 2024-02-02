import { AppError } from '../../../../../shared/errors/AppError'
import { MockSpecificationsRepository } from '../../../repositories/Specifitacions/MockSpecificationsRepository'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

let mockSpecificationsRepository: MockSpecificationsRepository

let createSpecificationUseCase: CreateSpecificationUseCase

describe('Create specification', () => {
  beforeEach(() => {
    mockSpecificationsRepository = new MockSpecificationsRepository()

    createSpecificationUseCase = new CreateSpecificationUseCase(
      mockSpecificationsRepository,
    )
  })

  it('should not be able create specification with same name', async () => {
    await expect(async () => {
      await mockSpecificationsRepository.create({
        name: 'same name',
        description: 'first specification',
      })

      await createSpecificationUseCase.execute({
        name: 'same name',
        description: 'second specification',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able create specification', async () => {
    const specification = await createSpecificationUseCase.execute({
      name: 'same name',
      description: 'second specification',
    })

    expect(specification).toHaveProperty('_id')
  })
})
