import { Types } from 'mongoose'
import { MockStorageProvider } from '../../../../../shared/container/providers/StorageProvider/MockStorageProvider'
import { MockCarsImagesRepository } from '../../../repositories/CarsImages/MockCarsImagesRepository'
import { MockCarsRepository } from './../../../repositories/Cars/MockCarsRepository'
import { RemoveCarImageUseCase } from './RemoveCarImageUseCase'
import { AppError } from '../../../../../shared/errors/AppError'

let mockCarsRepository: MockCarsRepository
let mockCarsImagesRepository: MockCarsImagesRepository
let storageProvider: MockStorageProvider

let removeCarImageUseCase: RemoveCarImageUseCase

describe('Remove car image', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository()
    mockCarsImagesRepository = new MockCarsImagesRepository()
    storageProvider = new MockStorageProvider()

    removeCarImageUseCase = new RemoveCarImageUseCase(
      mockCarsRepository,
      mockCarsImagesRepository,
      storageProvider,
    )
  })

  it('should not be able remove car image if imageId not sent', async () => {
    await expect(async () => {
      await removeCarImageUseCase.execute({
        carId: new Types.ObjectId().toString(),
        imageId: null,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able remove car image if carId not sent', async () => {
    await expect(async () => {
      await removeCarImageUseCase.execute({
        carId: null,
        imageId: new Types.ObjectId().toString(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able remove car image if imageId inválid', async () => {
    await expect(async () => {
      await removeCarImageUseCase.execute({
        carId: new Types.ObjectId().toString(),
        imageId: new Types.ObjectId().toString(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able remove car image', async () => {
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

    const carImage = await mockCarsImagesRepository.create({
      carId: car._id.toString(),
      imageName: 'teste',
      path: '/fake/teste',
    })

    await mockCarsRepository.addImage(
      car._id.toString(),
      carImage._id.toString(),
    )

    await removeCarImageUseCase.execute({
      carId: car._id.toString(),
      imageId: carImage._id.toString(),
    })

    const deletedImage = await mockCarsImagesRepository.findById(
      carImage._id.toString(),
    )

    const updatedCar = await mockCarsRepository.findById(car._id.toString())

    expect(updatedCar.images).not.toContain(carImage._id.toString())
    expect(deletedImage).toBeUndefined()
  })
})
