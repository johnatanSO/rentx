import { MockMailProvider } from '../../../../../shared/container/providers/MailProvider/MockMailProvider'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { SendContactUseCase } from './SendContactUseCase'

let mockUsersRepository: MockUsersRepository
let mailProvider: MockMailProvider

let sendContactUseCase: SendContactUseCase

describe('Send contact', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    mailProvider = new MockMailProvider()

    sendContactUseCase = new SendContactUseCase(
      mockUsersRepository,
      mailProvider,
    )
  })

  it('should not be able send contact if e-mail not sent', async () => {
    await expect(async () => {
      await sendContactUseCase.execute({
        email: null,
        message: 'Test message',
        name: 'John',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able send contact if message not sent', async () => {
    await expect(async () => {
      await sendContactUseCase.execute({
        email: 'teste@teste.com',
        message: null,
        name: 'John',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able send contact', async () => {
    const contact = jest.spyOn(mailProvider, 'sendMail')

    await sendContactUseCase.execute({
      email: 'teste@teste.com',
      message: 'Mensagem de teste',
      name: 'John',
    })

    expect(contact).toHaveBeenCalled()
  })
})
