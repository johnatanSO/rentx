import { Types } from 'mongoose'
import { AppError } from '../../../../shared/errors/AppError'
import { MockRentalsRepository } from '../../repositories/in-memory/MockRentalsRepository'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import dayjs from 'dayjs'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/DayjsDateProvider'
import { MockCarsRepository } from '../../../cars/repositories/Cars/MockCarsRepository'

let mockRentalsRepository: MockRentalsRepository

let createRentalUseCase: CreateRentalUseCase
let dayjsDateProvider: DayjsDateProvider
let mockCarsRepository: MockCarsRepository

describe('Create rental', () => {
  beforeEach(() => {
    mockRentalsRepository = new MockRentalsRepository()
    dayjsDateProvider = new DayjsDateProvider()
    mockCarsRepository = new MockCarsRepository()

    createRentalUseCase = new CreateRentalUseCase(
      mockRentalsRepository,
      dayjsDateProvider,
      mockCarsRepository,
    )
  })

  it('should be able create new rental', async () => {
    const newRental = await createRentalUseCase.execute({
      carId: '651b727ed2378291ec65392e',
      userId: '650cf6518adcd3da7764f338',
      expectedReturnDate: dayjs().add(1, 'day').toDate(),
    })

    expect(newRental).toHaveProperty('_id')
    expect(newRental).toHaveProperty('startDate')
  })

  it('should not be able to create new rental if there is another open to the same user', async () => {
    await expect(async () => {
      const fakeCarId1 = new Types.ObjectId()
      const fakeCarId2 = new Types.ObjectId()
      const fakeUserId = new Types.ObjectId()

      await createRentalUseCase.execute({
        carId: fakeCarId1.toString(),
        userId: fakeUserId.toString(), // Same userId.
        expectedReturnDate: dayjs().add(1, 'day').toDate(),
      })

      await createRentalUseCase.execute({
        carId: fakeCarId2.toString(),
        userId: fakeUserId.toString(), // Same userId.
        expectedReturnDate: dayjs().add(1, 'day').toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create new rental if there is another open to the same car', async () => {
    await expect(async () => {
      const fakeUserId1 = new Types.ObjectId()
      const fakeUserId2 = new Types.ObjectId()
      const fakeCarId = new Types.ObjectId()

      await createRentalUseCase.execute({
        carId: fakeCarId.toString(), // Same carId.
        userId: fakeUserId1.toString(),
        expectedReturnDate: dayjs().add(1, 'day').toDate(),
      })

      await createRentalUseCase.execute({
        carId: fakeCarId.toString(), // Same carId.
        userId: fakeUserId2.toString(),
        expectedReturnDate: dayjs().add(1, 'day').toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  // it('should not be able to create new rental if expected return date less than 24 hours', async () => {
  //   await expect(async () => {
  //     const fakeUserId = new Types.ObjectId()
  //     const fakeCarId = new Types.ObjectId()

  //     await createRentalUseCase.execute({
  //       carId: fakeCarId.toString(),
  //       userId: fakeUserId.toString(),
  //       expectedReturnDate: dayjs().utc().add(5, 'hours').toDate(),
  //     })
  //   }).rejects.toBeInstanceOf(AppError)
  // })
})
