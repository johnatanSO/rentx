import { Types } from 'mongoose'
import { MockRentalsRepository } from '../../repositories/MockRentalsRepository'
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

    const allRentals = await listAllRentalsUseCase.execute()

    expect(allRentals.length).toBeGreaterThan(0)
  })
})
