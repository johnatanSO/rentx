import { getRepository, Repository } from 'typeorm'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { User } from '../entities/User'
import { ICreateUserDTO } from '../../../dtos/User'

export class TypeormUsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async update(data: User): Promise<void> {
    await this.repository.save(data)
  }

  async create({
    driverLicense,
    email,
    name,
    password,
    isAdmin,
  }: ICreateUserDTO): Promise<User> {
    const newUser = this.repository.create({
      driverLicense,
      email,
      name,
      password,
      isAdmin,
    })

    return await this.repository.save(newUser)
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({ email })
  }

  async findById(_id: string): Promise<User> {
    return await this.repository.findOneBy({ _id })
  }
}
