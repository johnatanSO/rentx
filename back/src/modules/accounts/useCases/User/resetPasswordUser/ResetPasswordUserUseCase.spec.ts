import { Types } from 'mongoose'
import { DayjsDateProvider } from '../../../../../shared/container/providers/DateProvider/DayjsDateProvider'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { MockUsersTokensRepository } from '../../../repositories/UsersTokens/MockUsersTokensRepository'
import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

let mockUsersTokensRepository: MockUsersTokensRepository
let mockUsersRepository: MockUsersRepository
let dateProvider: DayjsDateProvider

let resetPasswordUserUseCase: ResetPasswordUserUseCase

describe('Reset password', () => {
  beforeEach(() => {
    mockUsersTokensRepository = new MockUsersTokensRepository()
    mockUsersRepository = new MockUsersRepository()
    dateProvider = new DayjsDateProvider()

    resetPasswordUserUseCase = new ResetPasswordUserUseCase(
      mockUsersTokensRepository,
      mockUsersRepository,
      dateProvider,
    )
  })

  it('should not be able reset password if refreshToken not sent', async () => {
    await expect(
      resetPasswordUserUseCase.execute({
        refreshToken: null,
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able reset password if refreshToken not sent', async () => {
    await expect(
      resetPasswordUserUseCase.execute({
        refreshToken: 'invalid_token',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able reset password if refreshToken is expired', async () => {
    await expect(async () => {
      const userId = new Types.ObjectId()

      const token = await mockUsersTokensRepository.create({
        user: userId.toString(),
        refreshToken: '123',
        expiresDate: dayjs().subtract(5, 'day').toDate(),
      })

      await resetPasswordUserUseCase.execute({
        password: '123',
        refreshToken: token.refreshToken,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able reset password', async () => {
    const user = await mockUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
      driverLicense: '111',
      isAdmin: false,
    })

    const token = await mockUsersTokensRepository.create({
      user: user._id.toString(),
      refreshToken: uuidv4(),
      expiresDate: dayjs().add(5, 'day').toDate(),
    })

    await resetPasswordUserUseCase.execute({
      password: '123',
      refreshToken: token.refreshToken,
    })
  })
})
