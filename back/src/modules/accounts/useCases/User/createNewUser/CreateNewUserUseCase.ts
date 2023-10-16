import { inject, injectable } from 'tsyringe'
import { IUser } from '../../../infra/mongoose/entities/User'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { hash } from 'bcrypt'
import { AppError } from '../../../../../shared/errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
  driverLicense: string
  confirmPassword: string
  isAdmin: boolean
}

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
    confirmPassword,
    isAdmin,
  }: IRequest): Promise<IUser> {
    const alreadyExistUser = await this.usersRepository.findByEmail(email)
    if (alreadyExistUser) {
      throw new AppError('Já existe um usuário com este e-mail cadastrado')
    }

    if (confirmPassword !== password) {
      throw new AppError('As senhas não correspondem')
    }

    const hashPassword = await hash(password, 10)
    const newUser = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      driverLicense,
      isAdmin,
    })

    return newUser
  }
}
