import { IUsersRepository } from '../IUsersRepository'
import { ICreateUserDTO } from '../../dtos/User'
import { User } from '../../infra/typeorm/entities/User'
import { Car } from '../../../cars/infra/typeorm/entities/Car'

export class MockUsersRepository implements IUsersRepository {
  users: User[]
  constructor() {
    this.users = []
  }

  async list(): Promise<User[]> {
    return this.users
  }

  async addCarToFavorite(carId: string, userId: string): Promise<void> {
    const index = this.users.findIndex(
      (user) => user._id.toString() === userId.toString(),
    )

    const newFavoriteCars = [...(this.users[index]?.favoriteCars as any), carId]

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
  }: ICreateUserDTO): Promise<User> {
    const newUser = new User({
      name,
      email,
      password,
      driverLicense,
      isAdmin: isAdmin || false,
    })

    this.users.push(newUser)

    return newUser
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

  async findById(_id: string): Promise<User> {
    const user = this.users.find((user) => user._id.toString() === _id)
    return user
  }

  async update(data: User): Promise<void> {
    const index = this.users.findIndex(
      (user) => user._id.toString() === data._id.toString(),
    )

    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        ...data,
      }
    }
  }

  async listFavoriteCars(userId: string): Promise<Car[]> {
    const user = this.users.find((user) => user._id.toString() === userId)
    return user.favoriteCars
  }
}
