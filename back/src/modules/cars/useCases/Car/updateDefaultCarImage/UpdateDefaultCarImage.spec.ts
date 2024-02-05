import { Types } from 'mongoose'
import { MockStorageProvider } from '../../../../../shared/container/providers/StorageProvider/MockStorageProvider'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockCarsRepository } from '../../../repositories/Cars/MockCarsRepository'
import { MockCarsImagesRepository } from '../../../repositories/CarsImages/MockCarsImagesRepository'
import { UpdateDefaultCarImageUseCase } from './UpdateDefaultCarImageUseCase'

let mockCarsImagesRepository: MockCarsImagesRepository
let mockCarsRepository: MockCarsRepository
let storageProvider: MockStorageProvider

let updateDefaultCarImageUseCase: UpdateDefaultCarImageUseCase

describe('Update default car image', () => {
  beforeEach(() => {
    mockCarsImagesRepository = new MockCarsImagesRepository()
    mockCarsRepository = new MockCarsRepository()
    storageProvider = new MockStorageProvider()

    updateDefaultCarImageUseCase = new UpdateDefaultCarImageUseCase(
      mockCarsImagesRepository,
      mockCarsRepository,
      storageProvider,
    )
  })

  it('should not be able update default car image if carId not sent', async () => {
    await expect(
      updateDefaultCarImageUseCase.execute({
        carId: null,
        defaultImage: 'image_test',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update default car image if image not sent', async () => {
    await expect(
      updateDefaultCarImageUseCase.execute({
        carId: new Types.ObjectId().toString(),
        defaultImage: null,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update default car image if carId invalid', async () => {
    await expect(
      updateDefaultCarImageUseCase.execute({
        carId: new Types.ObjectId().toString(),
        defaultImage: 'image_test',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able delete image if car already default image', async () => {
    const car = await mockCarsRepository.create({
      name: 'Name car',
      description: 'Description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: new Types.ObjectId().toString(),
      transmission: 'auto',
    })

    const carImage = await mockCarsImagesRepository.create({
      carId: car._id.toString(),
      imageName: 'test image',
      path: '/fake/test_image.jpeg',
    })

    await mockCarsRepository.updateOne(car._id.toString(), {
      defaultImage: carImage._id.toString(),
    })

    await updateDefaultCarImageUseCase.execute({
      carId: car._id.toString(),
      defaultImage: 'image_test',
    })
  })

  it('should be able update default image', async () => {
    const car = await mockCarsRepository.create({
      name: 'Name car',
      description: 'Description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: new Types.ObjectId().toString(),
      transmission: 'auto',
    })

    await updateDefaultCarImageUseCase.execute({
      carId: car._id.toString(),
      defaultImage: 'image_test',
    })
  })
})
