import { ICarsRepository } from '../../../repositories/ICarsRepository'
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
        transmission: 'automatic',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able update car infos', async () => {
    const categoryId = new Types.ObjectId()
    const car = await mockCarsRepository.create({
      name: 'Name car 1',
      description: 'Description car 1',
      dailyRate: 100,
      licensePlate: 'ABC-123',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: categoryId.toString(),
      transmission: 'auto',
    })

    const newData = {
      ...car,
      name: 'new name',
      description: 'new description',
      categoryId,
    }

    await updateCarInfosUseCase.execute({
      ...newData,
      carId: car._id.toString(),
      categoryId: categoryId.toString(),
    })

    delete newData.categoryId

    const updatedCar = await mockCarsRepository.findById(car._id.toString())

    Object.keys(newData).forEach((key) => {
      expect(updatedCar[key]).toEqual(newData[key])
    })
  })
})
