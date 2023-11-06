import { Types } from 'mongoose'
import { MockRentalsRepository } from './../../repositories/MockRentalsRepository'
import dayjs from 'dayjs'
import { FinalizeRentalUseCase } from './FinalizeRentalUseCase'
import { MockCarsRepository } from '../../../cars/repositories/Cars/MockCarsRepository'

let mockRentalsRepository: MockRentalsRepository
let mockCarsRepository: MockCarsRepository

let finalizeRentalUseCase: FinalizeRentalUseCase

describe('Finalize rental', () => {
  beforeEach(() => {
    mockRentalsRepository = new MockRentalsRepository()
    mockCarsRepository = new MockCarsRepository()

    finalizeRentalUseCase = new FinalizeRentalUseCase(
      mockRentalsRepository,
      mockCarsRepository,
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

    const newRental = await mockRentalsRepository.create({
      carId: newCar._id.toString(),
      expectedReturnDate: dayjs().add(1, 'day').toDate(),
      userId: new Types.ObjectId().toString(),
    })

    await finalizeRentalUseCase.execute(newRental._id.toString())

    const finalizedRental = await mockRentalsRepository.findById(
      newRental._id.toString(),
    )

    expect(finalizedRental.endDate).not.toBeNull()
  })
})
