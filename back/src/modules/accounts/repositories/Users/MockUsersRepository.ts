import { IUser } from '../../infra/mongoose/entities/User'
import { ICreateUserDTO, IUsersRepository } from './IUsersRepository'

export class MockUsersRepository implements IUsersRepository {
  users: IUser[]
  constructor() {
    this.users = []
  }

  async create(newUserData: ICreateUserDTO): Promise<IUser> {
    const newUser = {
      ...newUserData,
      _id: (Math.random() * 67832768).toString(),
      isAdmin: false,
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
    return this.users.find((user) => user._id === _id)
  }

  async update(filters: any, updateFields: any): Promise<void> {
    const fields = updateFields.$set
    this.users.forEach((user) => {
      if (user._id === filters._id) {
        user = {
          ...user,
          ...fields,
        }
      }
    })
  }
}
