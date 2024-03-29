import { Types } from 'mongoose'
import { AppError } from '../../../../shared/errors/AppError'
import { MockRentalsRepository } from '../../repositories/MockRentalsRepository'
import { UpdateRentalUseCase } from './UpdateRentalUseCase'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/DayjsDateProvider'

let mockRentalsRepository: MockRentalsRepository
let dateProvider: DayjsDateProvider

let updateRentalUseCase: UpdateRentalUseCase

describe('Update rental', () => {
  beforeEach(() => {
    mockRentalsRepository = new MockRentalsRepository()
    dateProvider = new DayjsDateProvider()

    updateRentalUseCase = new UpdateRentalUseCase(
      mockRentalsRepository,
      dateProvider,
    )
  })

  it('should not be able update rental if idRental not sent', async () => {
    await expect(
      updateRentalUseCase.execute({
        car: new Types.ObjectId().toString(),
        expectedReturnDate: dateProvider.addDays(5),
        rentalId: null,
        startDate: dateProvider.dateNow(),
        user: new Types.ObjectId().toString(),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update rental if idRental inválid', async () => {
    await expect(
      updateRentalUseCase.execute({
        car: new Types.ObjectId().toString(),
        expectedReturnDate: dateProvider.addDays(5),
        rentalId: new Types.ObjectId().toString(),
        startDate: dateProvider.dateNow(),
        user: new Types.ObjectId().toString(),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update rental if it has already ended', async () => {
    await expect(async () => {
      const rental = await mockRentalsRepository.create({
        carId: new Types.ObjectId().toString(),
        expectedReturnDate: dateProvider.addDays(5),
        userId: new Types.ObjectId().toString(),
      })

      await mockRentalsRepository.finalizeRental(rental._id.toString(), 100)

      await updateRentalUseCase.execute({
        car: new Types.ObjectId().toString(),
        expectedReturnDate: dateProvider.addDays(5),
        rentalId: rental._id.toString(),
        startDate: dateProvider.dateNow(),
        user: new Types.ObjectId().toString(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update car in rental if car already in use in another  rental', async () => {
    await expect(async () => {
      const car1 = new Types.ObjectId()
      const car2 = new Types.ObjectId()

      const rental1 = await mockRentalsRepository.create({
        carId: car1._id.toString(),
        expectedReturnDate: dateProvider.addDays(5),
        userId: new Types.ObjectId().toString(),
      })

      // Another rental.
      await mockRentalsRepository.create({
        carId: car2._id.toString(),
        expectedReturnDate: dateProvider.addDays(5),
        userId: new Types.ObjectId().toString(),
      })

      await updateRentalUseCase.execute({
        car: car2._id.toString(), // Car already in use.
        expectedReturnDate: dateProvider.addDays(5),
        rentalId: rental1._id.toString(),
        startDate: dateProvider.dateNow(),
        user: new Types.ObjectId().toString(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update user in rental if user already other rental active', async () => {
    await expect(async () => {
      const user1 = new Types.ObjectId()
      const user2 = new Types.ObjectId()

      const rental1 = await mockRentalsRepository.create({
        carId: new Types.ObjectId().toString(),
        expectedReturnDate: dateProvider.addDays(5),
        userId: user1._id.toString(),
      })

      // another rental
      await mockRentalsRepository.create({
        carId: new Types.ObjectId().toString(),
        expectedReturnDate: dateProvider.addDays(5),
        userId: user2._id.toString(),
      })

      await updateRentalUseCase.execute({
        car: new Types.ObjectId().toString(),
        expectedReturnDate: dateProvider.addDays(5),
        rentalId: rental1._id.toString(),
        startDate: dateProvider.dateNow(),
        user: user2._id.toString(), // User already rental active
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update rental if expected return date lower 24 hours', async () => {
    await expect(async () => {
      const rental = await mockRentalsRepository.create({
        carId: new Types.ObjectId().toString(),
        expectedReturnDate: dateProvider.addDays(5),
        userId: new Types.ObjectId().toString(),
      })

      await updateRentalUseCase.execute({
        car: new Types.ObjectId().toString(),
        expectedReturnDate: dateProvider.dateNow(),
        rentalId: rental._id.toString(),
        startDate: dateProvider.dateNow(),
        user: new Types.ObjectId().toString(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able update rental', async () => {
    const rental = await mockRentalsRepository.create({
      carId: new Types.ObjectId().toString(),
      userId: new Types.ObjectId().toString(),
      expectedReturnDate: dateProvider.addDays(5),
    })

    const newData = {
      car: new Types.ObjectId().toString(),
      user: new Types.ObjectId().toString(),
    }

    await updateRentalUseCase.execute({
      rentalId: rental._id.toString(),
      startDate: rental.startDate,
      expectedReturnDate: rental.expectedReturnDate,
      ...newData,
    })

    const updatedRental = await mockRentalsRepository.findById(
      rental._id.toString(),
    )

    expect(updatedRental.car.toString()).toBe(newData.car.toString())
    expect(updatedRental.user.toString()).toBe(newData.user.toString())
  })
})
