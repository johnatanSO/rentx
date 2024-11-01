import { MockUsersRepository } from '../../../repositories/in-memory/MockUsersRepository'
import { ListAllUsersUseCase } from './ListAllUsersUseCase'

let mockUserSRepository: MockUsersRepository

let listAllUsersUseCase: ListAllUsersUseCase

describe('List all users', () => {
  beforeEach(() => {
    mockUserSRepository = new MockUsersRepository()

    listAllUsersUseCase = new ListAllUsersUseCase(mockUserSRepository)
  })

  it('should be able list all users', async () => {
    const user = await mockUserSRepository.create({
      email: 'test@test.com',
      name: 'test',
      password: '123456',
      driverLicense: '0000',
    })

    const users = await listAllUsersUseCase.execute()

    expect(users).toContain(user)
  })
})
