import { inject, injectable } from 'tsyringe'
import { IMailProvider } from '../../../../../shared/container/providers/MailProvider/IMailProvider'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { AppError } from '../../../../../shared/errors/AppError'

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
    @inject('EtherealMailProvider') mailProvider: IMailProvider,
  ) {
    this.usersRepository = usersRepository
    this.mailProvider = mailProvider
  }

  async execute({ name, email, message }: IRequest): Promise<void> {
    if (!email) throw new AppError('E-mail não informado')
    if (!message) throw new AppError('Mensagem não informada')

    await this.mailProvider.sendMail(
      'devsantosjohn@gmail.com',
      'Contato RentX',
      `
        <h3>Contato de ${name || 'Anônimo'}</h3>
        <h3>E-mail ${email}</h3>
        <p>${message}</p>
      `,
    )

    await this.mailProvider.sendMail(
      email,
      'Contato RentX',
      `
        <h3>Olá, ${name || 'Anônimo'}</h3>
        <p>Recebemos a sua mensagem e logo retornaremos o seu contato</p>
        <p>Sua mensagem: ${message}</p>
      `,
    )
  }
}
