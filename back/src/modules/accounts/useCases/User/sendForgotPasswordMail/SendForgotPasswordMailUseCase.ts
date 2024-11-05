import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository'
import { AppError } from '../../../../../shared/errors/AppError'
import { v4 as uuidv4 } from 'uuid'
import { IDateProvider } from '../../../../../shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '../../../../../shared/container/providers/MailProvider/IMailProvider'
import { resolve } from 'path'

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
    @inject('MailProvider') mailProvider: IMailProvider,
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

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    )

    const token = uuidv4()

    const expiresDate = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refreshToken: token,
      userId: user._id,
      expiresDate,
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_PASSWORD}${token}`,
    }

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath,
    )
  }
}
