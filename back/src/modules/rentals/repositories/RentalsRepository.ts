import { Model } from 'mongoose'
import { Rental, RentalModel } from '../infra/mongoose/entities/Rental'
import { ICreateRentalDTO, IRentalsRepository } from './IRentalsRepository'

export class RentalsRepository implements IRentalsRepository {
  model: Model<Rental>
  constructor() {
    this.model = RentalModel
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return await this.model.findOne({ carId })
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return await this.model.findOne({ userId })
  }

  async create({
    carId,
    userId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const newRental = await this.model.create({
      carId,
      userId,
      expectedReturnDate,
    })

    await newRental.save()

    return newRental
  }

  async list(userId: string): Promise<Rental[]> {
    const rentals = await this.model.find({ userId })

    console.log('rentals', rentals)

    return rentals
  }
}
