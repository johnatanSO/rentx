import 'reflect-metadata'
import { AppError } from '../../../../../shared/errors/AppError'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { CreateNewUserUseCase } from '../createNewUser/CreateNewUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let mockUsersRepository: MockUsersRepository
let createNewUserUseCase: CreateNewUserUseCase

describe('Autenticação do usuário', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(mockUsersRepository)
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
        password: 'empty',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate a incorrect password', async () => {
    await expect(async () => {
      const user = {
        email: 'user@test.com',
        password: '123456',
        confirmPassword: '123456',
        driverLicense: '000123',
        name: 'User Test',
      }

      await createNewUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'empty password',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
