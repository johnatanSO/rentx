import { inject, injectable } from 'tsyringe'
import { IUsersTokensRepository } from '../../../repositories/UsersTokens/IUsersTokensRepository'
import { AppError } from '../../../../../shared/errors/AppError'
import { IDateProvider } from '../../../../../shared/container/providers/DateProvider/IDateProvider'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { hash } from 'bcrypt'

interface IRequest {
  refreshToken: string
  password: string
}

@injectable()
export class ResetPasswordUserUseCase {
  usersTokensRepository: IUsersTokensRepository
  usersRepository: IUsersRepository
  dateProvider: IDateProvider
  constructor(
    @inject('UsersTokensRepository')
    usersTokensRepository: IUsersTokensRepository,
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('DayjsDateProvider')
    dateProvider: IDateProvider,
  ) {
    this.usersTokensRepository = usersTokensRepository
    this.usersRepository = usersRepository
    this.dateProvider = dateProvider
  }

  async execute({ refreshToken, password }: IRequest): Promise<void> {
    if (!refreshToken)
      throw new AppError('Token de recuperação de senha não enviado')

    const userToken =
      await this.usersTokensRepository.findByRefreshToken(refreshToken)

    if (!userToken) throw new AppError('Token de recuperação de senha inválido')

    const expired = this.dateProvider.compareBefore(
      userToken.expiresDate,
      this.dateProvider.dateNow(),
    )

    if (expired) throw new AppError('Token de recuperação de senha expirado')

    const userId = userToken.user._id
    const encryptedPassword = await hash(password, 10)

    await this.usersRepository.update(
      { _id: userId },
      { $set: { password: encryptedPassword } },
    )

    await this.usersTokensRepository.deleteById(userToken._id.toString())
  }
}
