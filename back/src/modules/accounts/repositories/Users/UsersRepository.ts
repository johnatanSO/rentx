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
    isAdmin,
  }: ICreateUserDTO): Promise<IUser> {
    const newUser = await this.model.create({
      name,
      email,
      password,
      driverLicense,
      isAdmin,
    })

    await newUser.save()

    return newUser
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.model.findOne({ email })
    return user
  }

  async findById(_id: string): Promise<IUser> {
    const user = await this.model.findOne({ _id }).populate({
      path: 'favoriteCars',
      populate: {
        path: 'images',
      },
    })
    return user
  }

  async update(filters: any, updateFields: any): Promise<void> {
    await this.model.updateMany(filters, updateFields)
  }

  async addCarToFavorite(carId: string, userId: string): Promise<void> {
    await this.model.updateMany(
      { _id: userId },
      { $push: { favoriteCars: carId } },
    )
  }

  async removeFavoritedCar(carId: string, userId: string): Promise<void> {
    await this.model.updateMany(
      { _id: userId },
      { $pull: { favoriteCars: carId } },
    )
  }
}
