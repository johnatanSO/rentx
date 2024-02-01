import { Types } from 'mongoose'
import { MockCarsRepository } from '../../../repositories/Cars/MockCarsRepository'
import { ListAllCarsUseCase } from './ListAllCarsUseCase'

let mockCarsRepository: MockCarsRepository

let listAllCarsUseCase: ListAllCarsUseCase

describe('List all cars', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository()

    listAllCarsUseCase = new ListAllCarsUseCase(mockCarsRepository)
  })

  it('should be able list all cars', async () => {
    await mockCarsRepository.create({
      brand: 'teste',
      categoryId: new Types.ObjectId().toString(),
      dailyRate: 100,
      description: 'teste',
      fineAmount: 100,
      licensePlate: 'teste',
      name: 'teste',
      transmission: 'teste',
    })

    const allCars = await listAllCarsUseCase.execute()

    expect(allCars.length).toBeGreaterThan(0)
  })
})
