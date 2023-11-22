import { ICarsRepository } from './../../../repositories/Cars/ICarsRepository'
import { MockCarsRepository } from '../../../repositories/Cars/MockCarsRepository'
import { Types } from 'mongoose'
import { UpdateCarInfosUseCase } from './UpdateCarInfosUseCase'
import { AppError } from '../../../../../shared/errors/AppError'

let mockCarsRepository: ICarsRepository

let updateCarInfosUseCase: UpdateCarInfosUseCase

describe('Update car infos', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository()

    updateCarInfosUseCase = new UpdateCarInfosUseCase(mockCarsRepository)
  })

  it('should not be able update car infos if carId no sent', async () => {
    await expect(async () => {
      const createdCar = await mockCarsRepository.create({
        name: 'teste',
        transmission: 'auto',
        licensePlate: 'ABC-1234',
        brand: 'Teste',
        categoryId: new Types.ObjectId().toString(),
        dailyRate: 200,
        fineAmount: 400,
        description: 'Carro de testes',
      })

      delete createdCar._id

      await updateCarInfosUseCase.execute({
        ...createdCar,
        categoryId: createdCar.category._id.toString(),
        carId: undefined,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
