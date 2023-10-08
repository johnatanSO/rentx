import { Types } from 'mongoose'
import { Rental } from '../infra/mongoose/entities/Rental'
import { ICreateRentalDTO, IRentalsRepository } from './IRentalsRepository'

export class MockRentalsRepository implements IRentalsRepository {
  rentals: Rental[] = []
  async create({
    userId,
    carId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const newRental = {
      _id: new Types.ObjectId(),
      userId: new Types.ObjectId(userId),
      carId: new Types.ObjectId(carId),
      expectedReturnDate,
      startDate: new Date(),
      endDate: null,
      total: null,
      createdAt: new Date(),
      updateAt: new Date(),
    }

    this.rentals.push(newRental)

    return newRental
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.carId.toString() === carId && !rental.endDate,
    )
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.userId.toString() === userId && !rental.endDate,
    )
  }
}
