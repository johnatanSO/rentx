import { Types } from 'mongoose'
import { IUser } from '../../infra/mongoose/entities/User'
import { ICreateUserDTO, IUsersRepository } from './IUsersRepository'

export class MockUsersRepository implements IUsersRepository {
  users: IUser[]
  constructor() {
    this.users = []
  }

  async create({
    name,
    email,
    password,
    driverLicense,
    isAdmin,
  }: ICreateUserDTO): Promise<IUser> {
    const newUser = {
      name,
      email,
      password,
      driverLicense,
      isAdmin: isAdmin || false,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      avatar: null,
    }

    this.users.push(newUser)

    return newUser
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.users.find((user) => user.email === email)
  }

  async findById(_id: string): Promise<IUser> {
    return this.users.find((user) => user._id.toString() === _id)
  }

  async update(filters: any, updateFields: any): Promise<void> {
    const index = this.users.findIndex(
      (user) => user._id.toString() === filters._id.toString(),
    )

    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        ...updateFields.$set,
      }
    }
  }
}
