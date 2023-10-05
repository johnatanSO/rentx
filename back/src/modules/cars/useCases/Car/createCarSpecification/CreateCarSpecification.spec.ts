import { MockSpecificationsRepository } from './../../../repositories/Specifitacions/MockSpecificationsRepository'
import { Types } from 'mongoose'
import { AppError } from './../../../../../shared/errors/AppError'
import { MockCarsRepository } from './../../../repositories/Cars/MockCarsRepository'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let mockCarsRepository: MockCarsRepository
let mockSpecificationsRepository: MockSpecificationsRepository

let createCarSpecificationUseCase: CreateCarSpecificationUseCase

describe('Create car specification', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository()
    mockSpecificationsRepository = new MockSpecificationsRepository()

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      mockCarsRepository,
      mockSpecificationsRepository,
    )
  })

  it('should be able to add a new specification in car', async () => {
    const newCar = await mockCarsRepository.create({
      name: 'Name car 1',
      description: 'Description car 1',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: new Types.ObjectId(),
    })

    const specificationsIds = ['54321']

    await createCarSpecificationUseCase.execute({
      carId: newCar._id.toString(),
      specificationsIds,
    })
  })

  it('should not be able to add a new specification in car if car none-existent', async () => {
    await expect(async () => {
      const carId = '1234'
      const specificationsIds = ['54321']

      await createCarSpecificationUseCase.execute({
        carId,
        specificationsIds,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
