import { Types } from 'mongoose'
import { AppError } from '../../../../shared/errors/AppError'
import { MockRentalsRepository } from './../../repositories/MockRentalsRepository'
import { CreateRentalUseCase } from './CreateRentalUseCase'

let mockRentalsRepository: MockRentalsRepository

let createRentalUseCase: CreateRentalUseCase

describe('Create rental', () => {
  beforeEach(() => {
    mockRentalsRepository = new MockRentalsRepository()

    createRentalUseCase = new CreateRentalUseCase(mockRentalsRepository)
  })

  it('should be able create new rental', async () => {
    const newRental = await createRentalUseCase.execute({
      carId: '651b727ed2378291ec65392e',
      userId: '650cf6518adcd3da7764f338',
      expectedReturnDate: new Date(),
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
        expectedReturnDate: new Date(),
      })

      await createRentalUseCase.execute({
        carId: fakeCarId2.toString(),
        userId: fakeUserId.toString(), // Same userId.
        expectedReturnDate: new Date(),
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
        expectedReturnDate: new Date(),
      })

      await createRentalUseCase.execute({
        carId: fakeCarId.toString(), // Same carId.
        userId: fakeUserId2.toString(),
        expectedReturnDate: new Date(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
