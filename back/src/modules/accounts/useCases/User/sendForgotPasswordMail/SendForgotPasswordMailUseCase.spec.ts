import { DayjsDateProvider } from '../../../../../shared/container/providers/DateProvider/DayjsDateProvider'
import { MockMailProvider } from '../../../../../shared/container/providers/MailProvider/MockMailProvider'
import { AppError } from '../../../../../shared/errors/AppError'
import { UsersRepository } from '../../../repositories/Users/UsersRepository'
import { UsersTokensRepository } from '../../../repositories/UsersTokens/UsersTokensRepository'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let mockUsersRepository: UsersRepository
let mockUsersTokensRepository: UsersTokensRepository
let dateProvider: DayjsDateProvider
let mailProvider: MockMailProvider

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase

describe('Send forgot mail', () => {
  beforeEach(() => {
    mockUsersRepository = new UsersRepository()
    mockUsersTokensRepository = new UsersTokensRepository()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MockMailProvider()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      mockUsersRepository,
      mockUsersTokensRepository,
      dateProvider,
      mailProvider,
    )
  })

  /*  it('Should be able to send forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')

    const user = await mockUsersRepository.create({
      email: 'john@john.com',
      name: 'john',
      driverLicense: '123456',
      password: '123456',
      isAdmin: false,
    })

    await sendForgotPasswordMailUseCase.execute(user.email)

    expect(sendMail).toHaveBeenCalled()
  }) */

  it('Should not be able to send an mail if user not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('unexistsUser@mail.com'),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create an users token', async () => {
    const tokenMail = jest.spyOn(mockUsersTokensRepository, 'create')

    const user = await mockUsersRepository.create({
      email: 'john@john.com',
      name: 'john',
      driverLicense: '123456',
      password: '123456',
      isAdmin: false,
    })

    await sendForgotPasswordMailUseCase.execute(user.email)

    expect(tokenMail).toBeCalled()
  })
})
