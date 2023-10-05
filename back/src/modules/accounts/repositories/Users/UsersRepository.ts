import { Model } from 'mongoose'
import { IUser, UserModel } from '../../infra/mongoose/entities/User'
import { ICreateUserDTO, IUsersRepository } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private model: Model<IUser>
  constructor() {
    this.model = UserModel
  }

  async create({
    name,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO): Promise<IUser> {
    const newUser = await this.model.create({
      name,
      email,
      password,
      driverLicense,
    })

    await newUser.save()

    return newUser
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.model.findOne({ email })
    return user
  }

  async findById(_id: string): Promise<IUser> {
    const user = await this.model.findOne({ _id })
    return user
  }

  async update(filters: any, updateFields: any): Promise<void> {
    await this.model.updateMany(filters, updateFields)
  }
}
