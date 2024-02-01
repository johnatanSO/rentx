import { sign } from 'jsonwebtoken'
import { DayjsDateProvider } from '../../../../../shared/container/providers/DateProvider/DayjsDateProvider'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockUsersTokensRepository } from '../../../repositories/UsersTokens/MockUsersTokensRepository'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'
import auth from '../../../../../config/auth'
import dayjs from 'dayjs'
import { Types } from 'mongoose'

let mockUsersTokensRepository: MockUsersTokensRepository
let dateProvider: DayjsDateProvider

let refreshTokenUseCase: RefreshTokenUseCase

describe('Refresh token', () => {
  beforeEach(() => {
    mockUsersTokensRepository = new MockUsersTokensRepository()
    dateProvider = new DayjsDateProvider()

    refreshTokenUseCase = new RefreshTokenUseCase(
      mockUsersTokensRepository,
      dateProvider,
    )
  })

  it('should not be able refresh token if token not sent', async () => {
    await expect(refreshTokenUseCase.execute(null)).rejects.toBeInstanceOf(
      AppError,
    )
  })

  it('should not be able refresh token if user token inválid', async () => {
    await expect(async () => {
      const refreshToken = sign(
        { email: 'teste@teste.com' },
        auth.secretRefreshToken,
        {
          subject: '123',
          expiresIn: auth.expiresInRefreshToken,
        },
      )

      await refreshTokenUseCase.execute(refreshToken)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able refresh token', async () => {
    const userId = new Types.ObjectId()

    const oldToken = sign(
      { email: 'teste@teste.com' },
      auth.secretRefreshToken,
      {
        subject: userId.toString(),
        expiresIn: auth.expiresInRefreshToken,
      },
    )

    await mockUsersTokensRepository.create({
      expiresDate: dayjs().add(5, 'days').toDate(),
      refreshToken: oldToken,
      user: userId.toString(),
    })

    const { refreshToken, newToken } =
      await refreshTokenUseCase.execute(oldToken)

    expect(refreshToken).not.toBeUndefined()
    expect(newToken).not.toBeUndefined()
  })
})
