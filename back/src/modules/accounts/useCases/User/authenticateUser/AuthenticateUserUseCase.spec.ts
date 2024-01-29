import 'reflect-metadata'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { CreateNewUserUseCase } from '../createNewUser/CreateNewUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { MockUsersTokensRepository } from '../../../repositories/UsersTokens/MockUsersTokensRepository'
import { DayjsDateProvider } from '../../../../../shared/container/providers/DateProvider/DayjsDateProvider'

let mockUsersRepository: MockUsersRepository
let mockUsersTokensRepository: MockUsersTokensRepository
let dateProvider: DayjsDateProvider

let authenticateUserUseCase: AuthenticateUserUseCase
let createNewUserUseCase: CreateNewUserUseCase

describe('Autenticação do usuário', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    mockUsersTokensRepository = new MockUsersTokensRepository()
    dateProvider = new DayjsDateProvider()

    authenticateUserUseCase = new AuthenticateUserUseCase(
      mockUsersRepository,
      mockUsersTokensRepository,
      dateProvider,
    )
    createNewUserUseCase = new CreateNewUserUseCase(mockUsersRepository)
  })

  it('Should be able to authenticate a user', async () => {
    const user = {
      email: 'user@test.com',
      password: '123456',
      confirmPassword: '123456',
      driverLicense: '000123',
      name: 'User Test',
    }

    await createNewUserUseCase.execute(user)

    const authInfos = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(authInfos).toHaveProperty('token')
  })

  it('Should not be able to authenticate an none existent user', async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'reject@gmail.com',
        password: null,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate a incorrect password', async () => {
    await expect(async () => {
      const user = await mockUsersRepository.create({
        email: 'user@test.com',
        password: '123456',
        driverLicense: '000123',
        name: 'User Test',
      })

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
