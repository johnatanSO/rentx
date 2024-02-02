import { Types } from 'mongoose'
import { MockStorageProvider } from '../../../../../shared/container/providers/StorageProvider/MockStorageProvider'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockCarsRepository } from '../../../repositories/Cars/MockCarsRepository'
import { MockCarsImagesRepository } from '../../../repositories/CarsImages/MockCarsImagesRepository'
import { UploadCarImageUseCase } from './UploadCarImageUseCase'

let mockCarsImagesRepository: MockCarsImagesRepository
let mockCarsRepository: MockCarsRepository
let storageProvider: MockStorageProvider

let uploadCarImageUseCase: UploadCarImageUseCase

describe('Upload car iamge', () => {
  beforeEach(() => {
    mockCarsImagesRepository = new MockCarsImagesRepository()
    mockCarsRepository = new MockCarsRepository()
    storageProvider = new MockStorageProvider()

    uploadCarImageUseCase = new UploadCarImageUseCase(
      mockCarsImagesRepository,
      mockCarsRepository,
      storageProvider,
    )
  })

  it('should not be able upload car image if carIf not sent', async () => {
    await expect(
      uploadCarImageUseCase.execute({
        carId: null,
        image: {
          buffer: undefined,
          filename: 'teste',
          mimetype: 'teste',
          originalname: 'teste',
        },
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able upload car image if image not sent', async () => {
    await expect(
      uploadCarImageUseCase.execute({
        carId: new Types.ObjectId().toString(),
        image: null,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able update user avatar', async () => {
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

    await uploadCarImageUseCase.execute({
      carId: car._id.toString(),
      image: {
        originalname: 'new_avatar',
        buffer: undefined,
        filename: 'teste image',
        mimetype: 'jpeg',
      },
    })

    const updatedCar = await mockCarsRepository.findById(car._id.toString())

    expect(updatedCar.images.length).toBeGreaterThan(0)
  })
})
