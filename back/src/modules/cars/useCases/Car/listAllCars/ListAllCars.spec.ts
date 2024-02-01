import { MockCarsRepository } from '../../../repositories/Cars/MockCarsRepository'
import { ListAllCarsUseCase } from './ListAllCarsUseCase'

let mockCarsRepository: MockCarsRepository

let listAllCarsUseCase: ListAllCarsUseCase

describe('List all cars', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository()

    listAllCarsUseCase = new ListAllCarsUseCase(mockCarsRepository)
  })

  it('shoul be able list all cars', async () => {
    const allCars = await listAllCarsUseCase.execute()

    expect(allCars).toBeGreaterThan(0)
  })
})
