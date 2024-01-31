import { Types } from 'mongoose'
import { IUser } from '../../infra/mongoose/entities/User'
import { ICreateUserDTO, IUsersRepository } from './IUsersRepository'
import { Car } from '../../../cars/infra/mongoose/entities/Car'

export class MockUsersRepository implements IUsersRepository {
  users: IUser[]
  constructor() {
    this.users = []
  }

  async list(): Promise<IUser[]> {
    return this.users
  }

  async addCarToFavorite(carId: string, userId: string): Promise<void> {
    const index = this.users.findIndex(
      (user) => user._id.toString() === userId.toString(),
    )

    const newFavoriteCars = [
      ...(this.users[index]?.favoriteCars as any),
      new Types.ObjectId(carId),
    ]

    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        favoriteCars: newFavoriteCars,
      }
    }
  }

  async removeFavoritedCar(carId: string, userId: string): Promise<void> {
    const index = this.users.findIndex((user) => user._id.toString() === userId)

    const newFavoriteCars = this.users[index].favoriteCars.filter(
      (favoriteCarId) => favoriteCarId.toString() !== carId,
    )

    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        favoriteCars: newFavoriteCars as any,
      }
    }
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
      favoriteCars: [],
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
    const user = this.users.find((user) => user._id.toString() === _id)
    return user
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

  async listFavoriteCars(userId: string): Promise<Car[]> {
    const user = this.users.find((user) => user._id.toString() === userId)
    return user.favoriteCars
  }
}
