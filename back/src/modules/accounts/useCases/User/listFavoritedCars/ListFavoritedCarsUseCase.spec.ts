import { Types } from 'mongoose'
import { MockUsersRepository } from '../../../repositories/in-memory/MockUsersRepository'
import { ListFavoritedCarsUseCase } from './ListFavoritedCarsUseCase'

let mockUsersRepository: MockUsersRepository

let listFavoritedCarsUseCase: ListFavoritedCarsUseCase

describe('List favorited cars', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    listFavoritedCarsUseCase = new ListFavoritedCarsUseCase(mockUsersRepository)
  })

  it('should be able list favorited cars', async () => {
    const user = await mockUsersRepository.create({
      email: 'test@test.com',
      name: 'test',
      password: '123456',
      driverLicense: '0000',
    })
    const carId = new Types.ObjectId()
    const userId = user._id.toString()

    await mockUsersRepository.addCarToFavorite(carId.toString(), userId)

    const favoritedCars = await listFavoritedCarsUseCase.execute(userId)

    expect(favoritedCars).toContainEqual(carId)
  })
})
