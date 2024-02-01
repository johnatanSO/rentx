import { Types } from 'mongoose'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockCarsRepository } from '../../../repositories/Cars/MockCarsRepository'
import { DeleteCarUseCase } from './DeleteCarUseCase'

let mockCarsRepository: MockCarsRepository

let deleteCarUseCase: DeleteCarUseCase

describe('Delete car', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository()

    deleteCarUseCase = new DeleteCarUseCase(mockCarsRepository)
  })

  it('should not be able delete car if carId not sent', async () => {
    await expect(async () => {
      await deleteCarUseCase.execute(null)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able delete car ', async () => {
    const car = await mockCarsRepository.create({
      brand: 'teste',
      categoryId: new Types.ObjectId().toString(),
      dailyRate: 100,
      description: 'teste',
      fineAmount: 100,
      licensePlate: 'teste',
      name: 'teste',
      transmission: 'teste',
    })

    await deleteCarUseCase.execute(car._id.toString())

    const undefiendCar = await mockCarsRepository.findById(car._id.toString())

    expect(undefiendCar).toBeUndefined()
  })
})
