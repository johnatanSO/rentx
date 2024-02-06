import { AppError } from './../../../../../shared/errors/AppError'
import { MockCarsRepository } from './../../../repositories/Cars/MockCarsRepository'
import 'reflect-metadata'
import { Types } from 'mongoose'
import { CreateCarUseCase } from './CreateCarUseCase'
import { MockCarsImagesRepository } from '../../../repositories/CarsImages/MockCarsImagesRepository'
import { MockStorageProvider } from '../../../../../shared/container/providers/StorageProvider/MockStorageProvider'

let mockCarsRepository: MockCarsRepository
let mockCarsImagesRepository: MockCarsImagesRepository
let storageProvider: MockStorageProvider

let createCarUseCase: CreateCarUseCase

describe('Create car', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository()
    mockCarsImagesRepository = new MockCarsImagesRepository()
    storageProvider = new MockStorageProvider()

    createCarUseCase = new CreateCarUseCase(
      mockCarsRepository,
      mockCarsImagesRepository,
      storageProvider,
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
      defaultImage: null,
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
        defaultImage: null,
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
        defaultImage: null,
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
      defaultImage: null,
    })

    expect(newCar.avaliable).toEqual(true)
  })

  it('should not be able create an new car ir license plate not sent', async () => {
    await expect(async () => {
      await createCarUseCase.execute({
        name: 'Name car 1',
        description: 'Description car 1',
        dailyRate: 100,
        licensePlate: null,
        fineAmount: 60,
        brand: 'Brand',
        categoryId: new Types.ObjectId().toString(),
        transmission: 'auto',
        defaultImage: null,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able create car with default image', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car 1',
      description: 'Description car 1',
      dailyRate: 100,
      licensePlate: 'ABC-123',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: new Types.ObjectId().toString(),
      transmission: 'auto',
      defaultImage: 'testeImage',
    })

    expect(car.defaultImage).not.toEqual(null)
  })
})
