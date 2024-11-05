import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../../shared/errors/AppError'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository'
import auth from '../../../../../config/auth'
import { IDateProvider } from '../../../../../shared/container/providers/DateProvider/IDateProvider'
import { Car } from '../../../../cars/infra/typeorm/entities/Car'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
    isAdmin: boolean
    avatar: string
    avatarURL: string
    favoriteCars: Car[]
  }
  token: string
  refreshToken: string
}

@injectable()
export class AuthenticateUserUseCase {
  dateProvider: IDateProvider
  usersRepository: IUsersRepository
  usersTokensRepository: IUsersTokensRepository

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') dateProvider: IDateProvider,
  ) {
    this.dateProvider = dateProvider
    this.usersRepository = usersRepository
    this.usersTokensRepository = usersTokensRepository
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('E-mail ou senha incorretos')

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw new AppError('E-mail ou senha incorretos')

    const {
      secretToken,
      secretRefreshToken,
      expiresInToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = auth

    const token = sign({}, secretToken, {
      subject: user._id,
      expiresIn: expiresInToken,
    })

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user._id,
      expiresIn: expiresInRefreshToken,
    })

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresRefreshTokenDays,
    )

    await this.usersTokensRepository.create({
      userId: user._id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    })

    return {
      token,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
        favoriteCars: user.favoriteCars,
        avatarURL: user.avatarURL,
      },
    }
  }
}
