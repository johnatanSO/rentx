import { Types } from 'mongoose'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockCarsRepository } from '../../../repositories/Cars/MockCarsRepository'
import { GetCarInfoUseCase } from './GetCarInfoUseCase'

let mockCarsRepository: MockCarsRepository

let getCarInfoUseCase: GetCarInfoUseCase

describe('Get car info', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository()

    getCarInfoUseCase = new GetCarInfoUseCase(mockCarsRepository)
  })

  it('should not be able get car infos if carId not sent', async () => {
    await expect(getCarInfoUseCase.execute(null)).rejects.toBeInstanceOf(
      AppError,
    )
  })

  it('should be able get car infos', async () => {
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

    const carInfo = await getCarInfoUseCase.execute(car._id.toString())

    expect(carInfo).not.toBeUndefined()
  })
})
