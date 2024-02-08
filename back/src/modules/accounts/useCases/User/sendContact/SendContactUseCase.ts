import { inject, injectable } from 'tsyringe'
import { IMailProvider } from '../../../../../shared/container/providers/MailProvider/IMailProvider'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { AppError } from '../../../../../shared/errors/AppError'
import { resolve } from 'path'

interface IRequest {
  name: string
  email: string
  message: string
}

@injectable()
export class SendContactUseCase {
  usersRepository: IUsersRepository
  mailProvider: IMailProvider
  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('MailProvider') mailProvider: IMailProvider,
  ) {
    this.usersRepository = usersRepository
    this.mailProvider = mailProvider
  }

  async execute({ name, email, message }: IRequest): Promise<void> {
    if (!email) throw new AppError('E-mail não informado')
    if (!message) throw new AppError('Mensagem não informada')

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'views',
      'emails',
      'contact.hbs',
    )

    const variables = {
      name,
      email,
      message,
    }

    await this.mailProvider.sendMail(
      'devsantosjohn@gmail.com',
      'Contato RentX',
      variables,
      templatePath,
    )

    await this.mailProvider.sendMail(
      email,
      'Contato RentX',
      variables,
      templatePath,
    )
  }
}
