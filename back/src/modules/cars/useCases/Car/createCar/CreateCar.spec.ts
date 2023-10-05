import { AppError } from './../../../../../shared/errors/AppError'
import { MockCarsRepository } from './../../../repositories/Cars/MockCarsRepository'
import 'reflect-metadata'
import { Types } from 'mongoose'
import { CreateCarUseCase } from './CreateCarUseCase'

let mockCarsRepository: MockCarsRepository

let createCarUseCase: CreateCarUseCase

describe('Create car', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository()

    createCarUseCase = new CreateCarUseCase(mockCarsRepository)
  })

  it('Should be able create a new car', async () => {
    const newCar = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: new Types.ObjectId(),
    })

    expect(newCar).toHaveProperty('_id')
  })

  it('Should not be able create a new car if already exists license plate', async () => {
    await expect(async () => {
      await createCarUseCase.execute({
        name: 'Name car 1',
        description: 'Description car 1',
        dailyRate: 100,
        licensePlate: 'ABC-1234',
        fineAmount: 60,
        brand: 'Brand',
        categoryId: new Types.ObjectId(),
      })

      await createCarUseCase.execute({
        name: 'Name car 2',
        description: 'Description car 2',
        dailyRate: 100,
        licensePlate: 'ABC-1234',
        fineAmount: 60,
        brand: 'Brand',
        categoryId: new Types.ObjectId(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able create a new car with avaliable true by default', async () => {
    const newCar = await createCarUseCase.execute({
      name: 'Name car 1',
      description: 'Description car 1',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: new Types.ObjectId(),
    })

    expect(newCar.avaliable).toEqual(true)
  })
})
