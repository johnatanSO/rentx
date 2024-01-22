import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { IUsersTokensRepository } from '../../../repositories/UsersTokens/IUsersTokensRepository'
import { AppError } from '../../../../../shared/errors/AppError'
import { v4 as uuidv4 } from 'uuid'
import { IDateProvider } from '../../../../../shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '../../../../../shared/container/providers/MailProvider/IMailProvider'

@injectable()
export class SendForgotPasswordMailUseCase {
  usersRepository: IUsersRepository
  usersTokensRepository: IUsersTokensRepository
  dateProvider: IDateProvider
  mailProvider: IMailProvider
  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') dateProvider: IDateProvider,
    @inject('EtherealMailProvider') mailProvider: IMailProvider,
  ) {
    this.usersRepository = usersRepository
    this.usersTokensRepository = usersTokensRepository
    this.dateProvider = dateProvider
    this.mailProvider = mailProvider
  }

  async execute(email: string): Promise<void> {
    if (!email) throw new AppError('E-mail não informado')

    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('Usuário não encontrado')

    const token = uuidv4()

    const expiresDate = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refreshToken: token,
      user: user._id.toString(),
      expiresDate,
    })

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      `O link para o reset é ${token}`,
    )
  }
}
