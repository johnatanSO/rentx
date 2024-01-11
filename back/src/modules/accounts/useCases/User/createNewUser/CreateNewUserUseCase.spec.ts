import { CreateNewUserUseCase } from './CreateNewUserUseCase'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { AppError } from '../../../../../shared/errors/AppError'

let mockUsersRepository: MockUsersRepository

let createNewUserUseCase: CreateNewUserUseCase

describe('Create new user', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    createNewUserUseCase = new CreateNewUserUseCase(mockUsersRepository)
  })

  it('should be able create a new user', async () => {
    const user = await createNewUserUseCase.execute({
      email: 'teste@teste.com',
      name: 'novo usuário',
      password: 'teste',
      confirmPassword: 'teste',
      driverLicense: '0000',
    })

    expect(user).toHaveProperty('_id')
  })

  it('should no be able create new user if the password confirmation is different.', async () => {
    await expect(async () => {
      await createNewUserUseCase.execute({
        email: 'teste@teste.com',
        name: 'novo usuário',
        password: 'teste',
        confirmPassword: 'incorrectConfirmation',
        driverLicense: '0000',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create new user if user already exists', async () => {
    await expect(async () => {
      // First user
      await createNewUserUseCase.execute({
        email: 'user1@teste.com', // Same e-mail
        name: 'novo usuário 1',
        password: 'teste 1',
        confirmPassword: 'teste 1',
        driverLicense: '0000',
      })

      await createNewUserUseCase.execute({
        email: 'user1@teste.com', // Same e-mail
        name: 'novo usuário 1',
        password: 'teste 1',
        confirmPassword: 'teste 1',
        driverLicense: '0000',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
