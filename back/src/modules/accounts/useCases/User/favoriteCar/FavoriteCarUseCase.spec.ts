import { Types } from 'mongoose'
import { MockUsersRepository } from '../../../repositories/in-memory/MockUsersRepository'
import { FavoriteCarUseCase } from './FavoriteCarUseCase'
import { AppError } from '../../../../../shared/errors/AppError'

let mockUsersRepository: MockUsersRepository

let favoriteCarUseCase: FavoriteCarUseCase

describe('Favorite car', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    favoriteCarUseCase = new FavoriteCarUseCase(mockUsersRepository)
  })

  it('Should be able favorite a car', async () => {
    const carId = new Types.ObjectId()
    const user = await mockUsersRepository.create({
      email: 'test@test.com',
      name: 'test',
      password: '123456',
      driverLicense: '0000',
    })
    const userId = user._id.toString()

    const updatedUser = await favoriteCarUseCase.execute({
      carId: carId.toString(),
      userId,
    })

    expect(updatedUser.favoriteCars).toContainEqual(carId)
  })

  it('Should be able remove car from favorites', async () => {
    const carId = new Types.ObjectId()
    const user = await mockUsersRepository.create({
      email: 'test@test.com',
      name: 'test',
      password: '123456',
      driverLicense: '0000',
    })

    const userId = user._id.toString()
    await mockUsersRepository.addCarToFavorite(carId.toString(), userId)

    const updatedUser = await favoriteCarUseCase.execute({
      carId: carId.toString(),
      userId,
    })

    expect(updatedUser.favoriteCars).not.toContainEqual(carId)
  })

  it('should no be able favorite car if carId not sent', async () => {
    await expect(async () => {
      await favoriteCarUseCase.execute({
        userId: new Types.ObjectId().toString(),
        carId: null,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
