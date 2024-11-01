import { MockRentalsRepository } from '../../repositories/in-memory/MockRentalsRepository'
import dayjs from 'dayjs'
import { FinalizeRentalUseCase } from './FinalizeRentalUseCase'
import { MockCarsRepository } from '../../../cars/repositories/Cars/MockCarsRepository'
import { MockUsersRepository } from '../../../accounts/repositories/in-memory/MockUsersRepository'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/DayjsDateProvider'
import { AppError } from '../../../../shared/errors/AppError'
import { Types } from 'mongoose'

let mockRentalsRepository: MockRentalsRepository
let mockCarsRepository: MockCarsRepository
let mockUsersRepository: MockUsersRepository
let dayjsDateProvider: DayjsDateProvider

let finalizeRentalUseCase: FinalizeRentalUseCase

describe('Finalize rental', () => {
  beforeEach(() => {
    mockRentalsRepository = new MockRentalsRepository()
    mockCarsRepository = new MockCarsRepository()
    mockUsersRepository = new MockUsersRepository()
    dayjsDateProvider = new DayjsDateProvider()

    finalizeRentalUseCase = new FinalizeRentalUseCase(
      mockRentalsRepository,
      mockCarsRepository,
      mockUsersRepository,
      dayjsDateProvider,
    )
  })

  it('should be able finalize rental', async () => {
    const newCar = await mockCarsRepository.create({
      name: 'Name car',
      description: 'Description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: new Types.ObjectId().toString(),
      transmission: 'auto',
    })

    const user = await mockUsersRepository.create({
      driverLicense: 'teste',
      email: 'teste@teste.com',
      name: 'teste',
      password: '123456',
      isAdmin: true,
    })

    const userId = user._id.toString()

    const newRental = await mockRentalsRepository.create({
      carId: newCar._id.toString(),
      expectedReturnDate: dayjs().add(1, 'day').toDate(),
      userId,
    })

    await finalizeRentalUseCase.execute({
      rentalId: newRental._id.toString(),
      userId,
    })

    const finalizedRental = await mockRentalsRepository.findById(
      newRental._id.toString(),
    )

    expect(finalizedRental.endDate).not.toBeNull()
  })

  it('should not e able finalize rental if idRental not sent', async () => {
    await expect(async () => {
      await finalizeRentalUseCase.execute({ rentalId: null, userId: '123' })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not e able finalize rental if idRental is for a rental that does not exist', async () => {
    await expect(async () => {
      await finalizeRentalUseCase.execute({
        rentalId: 'invalid_id',
        userId: '123',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not e able finalize rental user is different from the user requesting completion', async () => {
    await expect(async () => {
      const user1 = await mockUsersRepository.create({
        driverLicense: '1111',
        email: 'teste1@teste.com',
        name: 'teste1',
        password: '1111',
        isAdmin: false,
      })

      const user2 = await mockUsersRepository.create({
        driverLicense: '2222',
        email: 'teste2@teste.com',
        name: 'teste2',
        password: '2222',
        isAdmin: false,
      })

      const rental = await mockRentalsRepository.create({
        carId: new Types.ObjectId().toString(),
        expectedReturnDate: dayjs().add(1, 'day').toDate(),
        userId: user1._id.toString(),
      })

      await finalizeRentalUseCase.execute({
        rentalId: rental._id.toString(),
        userId: user2._id.toString(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not e able finalize rental if it is already finished', async () => {
    await expect(async () => {
      const user1 = await mockUsersRepository.create({
        driverLicense: '1111',
        email: 'teste1@teste.com',
        name: 'teste1',
        password: '1111',
        isAdmin: false,
      })

      const rental = await mockRentalsRepository.create({
        carId: new Types.ObjectId().toString(),
        expectedReturnDate: dayjs().add(1, 'day').toDate(),
        userId: user1._id.toString(),
      })

      await mockRentalsRepository.finalizeRental(rental._id.toString(), 1000)

      await finalizeRentalUseCase.execute({
        rentalId: rental._id.toString(),
        userId: user1._id.toString(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able finalize rental with rentalDuration greater than 0', async () => {
    const user = await mockUsersRepository.create({
      driverLicense: 'teste',
      email: 'teste@teste.com',
      name: 'teste',
      password: '123456',
      isAdmin: true,
    })

    const newCar = await mockCarsRepository.create({
      name: 'Name car',
      description: 'Description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: new Types.ObjectId().toString(),
      transmission: 'auto',
    })

    const newRental = await mockRentalsRepository.create({
      carId: newCar._id.toString(),
      expectedReturnDate: dayjs().add(1, 'day').toDate(),
      userId: user._id.toString(),
    })

    await mockRentalsRepository.update(newRental._id.toString(), {
      startDate: dayjs().subtract(5, 'day').toDate(),
    })

    await finalizeRentalUseCase.execute({
      rentalId: newRental._id.toString(),
      userId: user._id.toString(),
    })

    const finalizedRental = await mockRentalsRepository.findById(
      newRental._id.toString(),
    )

    expect(finalizedRental.endDate).not.toBeNull()
  })

  it('should be able finalize rental with extraDays', async () => {
    const user = await mockUsersRepository.create({
      driverLicense: 'teste',
      email: 'teste@teste.com',
      name: 'teste',
      password: '123456',
      isAdmin: true,
    })

    const newCar = await mockCarsRepository.create({
      name: 'Name car',
      description: 'Description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: new Types.ObjectId().toString(),
      transmission: 'auto',
    })

    const newRental = await mockRentalsRepository.create({
      carId: newCar._id.toString(),
      expectedReturnDate: dayjs().subtract(2, 'day').toDate(),
      userId: user._id.toString(),
    })

    await finalizeRentalUseCase.execute({
      rentalId: newRental._id.toString(),
      userId: user._id.toString(),
    })

    const finalizedRental = await mockRentalsRepository.findById(
      newRental._id.toString(),
    )

    expect(finalizedRental.endDate).not.toBeNull()
  })
})
