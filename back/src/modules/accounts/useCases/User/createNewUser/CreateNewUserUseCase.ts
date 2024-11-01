import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { hash } from 'bcrypt'
import { AppError } from '../../../../../shared/errors/AppError'
import { User } from '../../../infra/typeorm/entities/User'

interface IRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
  driverLicense: string
  isAdmin?: boolean
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
    confirmPassword,
    driverLicense,
    isAdmin,
  }: IRequest): Promise<User> {
    if (!email) throw new AppError('E-mail não enviado')

    const alreadyExistUser = await this.usersRepository.findByEmail(email)

    if (alreadyExistUser) {
      throw new AppError('Já existe um usuário com este e-mail cadastrado')
    }

    if (confirmPassword !== password) {
      throw new AppError('As senhas não correspondem')
    }

    const hashPassword = await hash(password, 10)
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      confirmPassword,
      driverLicense,
      isAdmin,
    })

    await this.usersRepository.save(newUser)

    return newUser
  }
}
