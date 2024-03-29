import { AppError } from '../../../../../shared/errors/AppError'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { UpdateUserInfosUseCase } from './UpdateUserInfosUseCase'

let mockUsersRepository: MockUsersRepository

let updateUserInfosUserCase: UpdateUserInfosUseCase

describe('Update user infos', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    updateUserInfosUserCase = new UpdateUserInfosUseCase(mockUsersRepository)
  })

  it('should not be able update user infos if idUser not sent', async () => {
    await expect(async () => {
      await updateUserInfosUserCase.execute({
        email: 'teste@teste.com',
        isAdmin: false,
        name: 'teste',
        userId: null,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able update user infos', async () => {
    const user = await mockUsersRepository.create({
      driverLicense: '123',
      email: 'teste@teste.com',
      name: 'teste',
      password: '123',
      isAdmin: false,
    })

    const newEmail = 'novo_email@teste.com'

    const updatedUser = await updateUserInfosUserCase.execute({
      email: newEmail,
      isAdmin: false,
      name: 'teste',
      userId: user._id.toString(),
    })

    expect(updatedUser.email).toBe(newEmail)
  })
})
