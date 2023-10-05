import { inject, injectable } from 'tsyringe'
import { IUser } from '../../../infra/mongoose/entities/User'
import {
  ICreateUserDTO,
  IUsersRepository,
} from '../../../repositories/Users/IUsersRepository'
import { hash } from 'bcrypt'
import { AppError } from '../../../../../shared/errors/AppError'

@injectable()
export class CreateNewUserUseCase {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    name,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO): Promise<IUser> {
    const alreadyExistUser = !!(await this.usersRepository.findByEmail(email))
    if (alreadyExistUser) {
      throw new AppError('Já existe um usuário com este e-mail cadastrado')
    }

    const hashPassword = await hash(password, 10)
    const newUser = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      driverLicense,
    })

    return newUser
  }
}
