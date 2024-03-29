import { Types } from 'mongoose'
import { MockRentalsRepository } from '../../repositories/MockRentalsRepository'
import { ListRentalsUseCase } from './ListRentalsUseCase'
import dayjs from 'dayjs'
import { AppError } from '../../../../shared/errors/AppError'

let mockRentalsRepository: MockRentalsRepository

let listRentalsUseCase: ListRentalsUseCase

describe('List rentals', () => {
  beforeEach(() => {
    mockRentalsRepository = new MockRentalsRepository()

    listRentalsUseCase = new ListRentalsUseCase(mockRentalsRepository)
  })

  it('Should be able list rentals', async () => {
    const userId = new Types.ObjectId().toString()
    const carId = new Types.ObjectId().toString()
    const expectedReturnDate = dayjs().add(2, 'days').toDate()

    const newRental = await mockRentalsRepository.create({
      carId,
      userId,
      expectedReturnDate,
    })

    const rentals = await listRentalsUseCase.execute(userId)

    expect(rentals).toHaveLength(1)
    expect(rentals).toContain(newRental)
  })

  it('Should not be able list rentals if idUser not sent', async () => {
    await expect(listRentalsUseCase.execute(null)).rejects.toBeInstanceOf(
      AppError,
    )
  })
})
