import { MockStorageProvider } from '../../../../../shared/container/providers/StorageProvider/MockStorageProvider'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
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
        avatarImage: {
          originalname: 'teste name',
          buffer: undefined,
          mimetype: 'jpeg',
        },
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update user avatar if idUser invalid', async () => {
    await expect(async () => {
      await updateUserAvatarUseCase.execute({
        userId: '777',
        avatarImage: {
          originalname: 'teste name',
          buffer: undefined,
          mimetype: 'jpeg',
        },
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able delete user avatar if imageName invalid ', async () => {
    await expect(async () => {
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
            avatar: 'invalid_name',
          },
        },
      )

      await updateUserAvatarUseCase.execute({
        userId: user._id.toString(),
        avatarImage: {
          originalname: '',
          buffer: undefined,
          mimetype: 'jpeg',
        },
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

    await updateUserAvatarUseCase.execute({
      userId: user._id.toString(),
      avatarImage: {
        originalname: 'new_avatar',
        buffer: undefined,
        mimetype: 'jpeg',
      },
    })
  })

  it('should be able update user avatar', async () => {
    const user = await mockUsersRepository.create({
      email: 'teste@teste.com',
      name: 'teste',
      driverLicense: '123',
      password: '123',
      isAdmin: false,
    })

    await updateUserAvatarUseCase.execute({
      userId: user._id.toString(),
      avatarImage: {
        originalname: 'new_avatar',
        buffer: undefined,
        mimetype: 'jpeg',
      },
    })
  })
})
