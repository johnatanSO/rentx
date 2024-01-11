import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { IUsersTokensRepository } from '../../../repositories/UsersTokens/IUsersTokensRepository'
import auth from '../../../../../config/auth'
import { AppError } from '../../../../../shared/errors/AppError'
import { IDateProvider } from '../../../../../shared/container/providers/DateProvider/IDateProvider'

interface IPayload {
  sub: string
  email: string
}

@injectable()
export class RefreshTokenUseCase {
  usersTokensRepository: IUsersTokensRepository
  dateProvider: IDateProvider

  constructor(
    @inject('UsersTokensRepository')
    usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') dateProvider: IDateProvider,
  ) {
    this.usersTokensRepository = usersTokensRepository
    this.dateProvider = dateProvider
  }

  async execute(token: string): Promise<string> {
    if (!token) throw new AppError('Refresh token não enviado')

    const { sub: userId, email } = verify(
      token,
      auth.secretRefreshToken,
    ) as IPayload

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token,
      )

    if (!userToken) throw new AppError('Refresh token não encontrado')

    await this.usersTokensRepository.deleteById(userToken._id.toString())

    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: userId,
      expiresIn: auth.expiresInRefreshToken,
    })

    const expiresDate = this.dateProvider.addDays(auth.expiresRefreshTokenDays)

    await this.usersTokensRepository.create({
      user: userId,
      refreshToken,
      expiresDate,
    })

    return refreshToken
  }
}
