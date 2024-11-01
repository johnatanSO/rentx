import { MockStorageProvider } from '../../../../../shared/container/providers/StorageProvider/MockStorageProvider'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockUsersRepository } from '../../../repositories/in-memory/MockUsersRepository'
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

let mockUsersRepository: MockUsersRepository
let storageProvider: MockStorageProvider

let updateUserAvatarUseCase: UpdateUserAvatarUseCase

describe('Update user avatar', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    storageProvider = new MockStorageProvider()

    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      mockUsersRepository,
      storageProvider,
    )
  })

  it('should not be able update user avatar if image not sent', async () => {
    await expect(async () => {
      await updateUserAvatarUseCase.execute({
        avatarImage: null,
        userId: '123',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update user avatar if idUser not sent', async () => {
    await expect(async () => {
      await updateUserAvatarUseCase.execute({
        userId: null,
        avatarImage: 'image_test',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update user avatar if idUser invalid', async () => {
    await expect(async () => {
      await updateUserAvatarUseCase.execute({
        userId: '777',
        avatarImage: 'image_test',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able delete image if user already have avatar', async () => {
    const user = await mockUsersRepository.create({
      email: 'teste@teste.com',
      name: 'teste',
      driverLicense: '123',
      password: '123',
      isAdmin: false,
    })

    await mockUsersRepository.update(
      { _id: user._id.toString() },
      {
        $set: {
          avatar: 'appspot.com/image_name',
        },
      },
    )

    const updatedUser = await updateUserAvatarUseCase.execute({
      userId: user._id.toString(),
      avatarImage: 'image_test',
    })

    expect(updatedUser.avatar).not.toEqual('appspot.com/image_name')
  })

  it('should be able update user avatar', async () => {
    const user = await mockUsersRepository.create({
      email: 'teste@teste.com',
      name: 'teste',
      driverLicense: '123',
      password: '123',
      isAdmin: false,
    })

    const updatedUser = await updateUserAvatarUseCase.execute({
      userId: user._id.toString(),
      avatarImage: 'image_test',
    })

    expect(updatedUser.avatar).not.toBeNull()
  })
})
