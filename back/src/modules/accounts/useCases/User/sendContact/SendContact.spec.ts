import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { SendContactUseCase } from './SendContactUseCase'

let mockUsersRepository: any

let sendContactUseCase: SendContactUseCase

describe('Send contact', () => {
  beforeEach(() => {
    mockUsersRepository = MockUsersRepository()

    sendContactUseCase = new SendContactUseCase(mockUsersRepository)
  })

  it('should not be able send contact if e-mail not sent', async () => {
    await sendContactUseCase.execute()
  })
})
