import { Types } from 'mongoose'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockSpecificationsRepository } from '../../../repositories/Specifitacions/MockSpecificationsRepository'
import { UpdateSpecificationUseCase } from './UpdateSpecificationUseCase'

let mockSpecificationsRepository: MockSpecificationsRepository

let updateSpecificationUseCase: UpdateSpecificationUseCase

describe('Update specification', () => {
  beforeEach(() => {
    mockSpecificationsRepository = new MockSpecificationsRepository()

    updateSpecificationUseCase = new UpdateSpecificationUseCase(
      mockSpecificationsRepository,
    )
  })

  it('should not be able update specification if idSpecification not sent', async () => {
    await expect(
      updateSpecificationUseCase.execute({
        description: 'teste',
        name: 'teste',
        specificationId: null,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update specification if idSpecification inválid', async () => {
    await expect(
      updateSpecificationUseCase.execute({
        description: 'teste',
        name: 'teste',
        specificationId: new Types.ObjectId().toString(),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able update specification', async () => {
    const specification = await mockSpecificationsRepository.create({
      name: 'teste',
      description: 'teste',
    })

    const newData = {
      name: 'new name',
      description: 'new description',
    }

    await updateSpecificationUseCase.execute({
      ...newData,
      specificationId: specification._id.toString(),
    })

    const updatedSpecification = await mockSpecificationsRepository.findById(
      specification._id.toString(),
    )

    expect(updatedSpecification.name).toBe(newData.name)
    expect(updatedSpecification.description).toBe(newData.description)
  })
})
