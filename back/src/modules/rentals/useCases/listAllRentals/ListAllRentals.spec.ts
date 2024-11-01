import { Types } from 'mongoose'
import { MockRentalsRepository } from '../../repositories/in-memory/MockRentalsRepository'
import { ListAllRentalsUseCase } from './ListAllRentalsUseCase'
import dayjs from 'dayjs'

let mockRentalsRepository: MockRentalsRepository

let listAllRentalsUseCase: ListAllRentalsUseCase

describe('List all rentals', () => {
  beforeEach(() => {
    mockRentalsRepository = new MockRentalsRepository()

    listAllRentalsUseCase = new ListAllRentalsUseCase(mockRentalsRepository)
  })

  it('Should be able list all rentals', async () => {
    await mockRentalsRepository.create({
      carId: new Types.ObjectId().toString(),
      expectedReturnDate: dayjs().add(1, 'day').toDate(),
      userId: new Types.ObjectId().toString(),
    })

    const carId = null
    const userId = null
    const filterStartDate = dayjs().startOf('month').toISOString()
    const filterEndDate = dayjs().endOf('month').toISOString()

    const allRentals = await listAllRentalsUseCase.execute({
      carId,
      userId,
      filterEndDate,
      filterStartDate,
    })

    expect(allRentals.length).toBeGreaterThan(0)
  })
})
