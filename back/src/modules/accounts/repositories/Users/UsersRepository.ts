import { Model } from 'mongoose'
import { Car } from '../../../cars/infra/mongoose/entities/Car'
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
    const user = await this.model.findOne({ _id })
    return user
  }

  async update(filters: any, updateFields: any): Promise<void> {
    await this.model.updateMany(filters, updateFields)
  }

  async addCarToFavorite(carId: string, userId: string): Promise<void> {
    await this.model.updateOne(
      { _id: userId },
      { $push: { favoriteCars: carId } },
    )
  }

  async removeFavoritedCar(carId: string, userId: string): Promise<void> {
    await this.model.updateOne(
      { _id: userId },
      { $pull: { favoriteCars: carId } },
    )
  }

  async list(): Promise<IUser[]> {
    const users = await this.model.find()
    return users
  }

  async listFavoriteCars(userId: string): Promise<Car[]> {
    const user = await this.model.findById(userId).populate({
      path: 'favoriteCars',
      populate: [
        { path: 'specifications' },
        { path: 'images' },
        { path: 'defaultImage' },
      ],
    })

    return user.favoriteCars
  }
}
