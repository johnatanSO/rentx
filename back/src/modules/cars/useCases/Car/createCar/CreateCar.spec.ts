import { AppError } from './../../../../../shared/errors/AppError'
import { MockCarsRepository } from './../../../repositories/Cars/MockCarsRepository'
import 'reflect-metadata'
import { Types } from 'mongoose'
import { CreateCarUseCase } from './CreateCarUseCase'
import { MockCarsImagesRepository } from '../../../repositories/CarsImages/MockCarsImagesRepository'

let mockCarsRepository: MockCarsRepository
let mockCarsImagesRepository: MockCarsImagesRepository

let createCarUseCase: CreateCarUseCase

describe('Create car', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository()
    mockCarsImagesRepository = new MockCarsImagesRepository()

    createCarUseCase = new CreateCarUseCase(
      mockCarsRepository,
      mockCarsImagesRepository,
    )
  })

  it('Should be able create a new car', async () => {
    const newCar = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: new Types.ObjectId().toString(),
      transmission: 'auto',
      imageName: null,
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
        categoryId: new Types.ObjectId().toString(),
        transmission: 'auto',
        imageName: null,
      })

      await createCarUseCase.execute({
        name: 'Name car 2',
        description: 'Description car 2',
        dailyRate: 100,
        licensePlate: 'ABC-1234',
        fineAmount: 60,
        brand: 'Brand',
        categoryId: new Types.ObjectId().toString(),
        transmission: 'auto',
        imageName: null,
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
      categoryId: new Types.ObjectId().toString(),
      transmission: 'auto',
      imageName: null,
    })

    expect(newCar.avaliable).toEqual(true)
  })
})
