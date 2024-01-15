import { Model } from 'mongoose'
import { Rental, RentalModel } from '../infra/mongoose/entities/Rental'
import {
  ICreateRentalDTO,
  IListRentalsDTO,
  IRentalsRepository,
} from './IRentalsRepository'

export class RentalsRepository implements IRentalsRepository {
  model: Model<Rental>
  constructor() {
    this.model = RentalModel
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return await this.model.findOne({ car: carId, endDate: null })
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return await this.model.findOne({ user: userId, endDate: null })
  }

  async create({
    carId,
    userId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const newRental = await this.model.create({
      car: carId,
      user: userId,
      expectedReturnDate,
    })

    await newRental.save()

    return newRental
  }

  async list(userId: string): Promise<Rental[]> {
    const rentals = await this.model
      .find({
        ...(userId ? { user: userId } : {}),
      })
      .populate([
        {
          path: 'car',
          populate: {
            path: 'defaultImage',
          },
        },
        { path: 'user' },
      ])

    return rentals
  }

  async listAll({
    userId,
    carId,
    filterStartDate,
    filterEndDate,
  }: IListRentalsDTO): Promise<Rental[]> {
    const rentals = await this.model
      .find({
        ...(userId ? { user: userId } : {}),
        ...(carId ? { car: carId } : {}),
        startDate: {
          $gte: filterStartDate,
          $lte: filterEndDate,
        },
      })
      .populate([
        {
          path: 'car',
          populate: {
            path: 'defaultImage',
          },
        },
        { path: 'user' },
      ])

    return rentals
  }

  async finalizeRental(rentalId: string, totalValue: number): Promise<void> {
    await this.model.updateOne(
      { _id: rentalId },
      { $set: { endDate: new Date(), total: totalValue } },
    )
  }

  async findById(rentalId: string): Promise<Rental> {
    const rental = await this.model.findOne({ _id: rentalId })

    return rental
  }

  async update(rentalId: string, fields: any): Promise<void> {
    await this.model.updateOne({ _id: rentalId }, fields)
  }
}
