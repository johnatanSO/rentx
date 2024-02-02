import { AppError } from '../../../../../shared/errors/AppError'
import { MockSpecificationsRepository } from '../../../repositories/Specifitacions/MockSpecificationsRepository'
import { DeleteSpecificationUseCase } from './DeleteSpecificationUseCase'

let mockSpecificationsRepository: MockSpecificationsRepository

let deleteSpecificationUseCase: DeleteSpecificationUseCase

describe('Delete specification', () => {
  beforeEach(() => {
    mockSpecificationsRepository = new MockSpecificationsRepository()

    deleteSpecificationUseCase = new DeleteSpecificationUseCase(
      mockSpecificationsRepository,
    )
  })

  it('should not be able delete specification if specificationId not sent', async () => {
    await expect(
      deleteSpecificationUseCase.execute(null),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able delete specification ', async () => {
    const specification = await mockSpecificationsRepository.create({
      name: 'test',
      description: 'test',
    })

    await deleteSpecificationUseCase.execute(specification._id.toString())

    const undefinedSpecification = await mockSpecificationsRepository.findById(
      specification._id.toString(),
    )

    expect(undefinedSpecification).toBeUndefined()
  })
})
