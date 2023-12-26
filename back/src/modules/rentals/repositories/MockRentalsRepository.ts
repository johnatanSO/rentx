import { Types } from 'mongoose'
import { Rental } from '../infra/mongoose/entities/Rental'
import {
  ICreateRentalDTO,
  IListRentalsDTO,
  IRentalsRepository,
} from './IRentalsRepository'
import dayjs from 'dayjs'

export class MockRentalsRepository implements IRentalsRepository {
  rentals: Rental[] = []

  async listAll({
    userId,
    carId,
    filterStartDate,
    filterEndDate,
  }: IListRentalsDTO): Promise<Rental[]> {
    const rentals = this.rentals
      .filter((rental) => (userId ? rental.user.toString() === userId : rental))
      .filter((rental) => (carId ? rental.car.toString() === carId : rental))
      .filter(
        (rental) =>
          dayjs(rental.startDate).isAfter(filterStartDate) &&
          dayjs(rental.startDate).isBefore(filterEndDate),
      )

    return rentals
  }

  async update(rentalId: string, fields: any): Promise<void> {
    const retanlIndex = this.rentals.findIndex(
      (rental) => rental._id.toString() === rentalId,
    )

    this.rentals[retanlIndex] = {
      ...this.rentals[retanlIndex],
      ...fields,
    }
  }

  async create({
    userId,
    carId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const newRental = {
      _id: new Types.ObjectId(),
      user: new Types.ObjectId(userId),
      car: new Types.ObjectId(carId),
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
      (rental) => rental.car.toString() === carId && !rental.endDate,
    )
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user.toString() === userId && !rental.endDate,
    )
  }

  async list(userId: string): Promise<Rental[]> {
    if (userId) {
      return this.rentals.filter((rental) => rental.user.toString() === userId)
    }
    return this.rentals
  }

  async findById(rentalId: string): Promise<Rental> {
    return this.rentals.find((rental) => rental._id.toString() === rentalId)
  }

  async finalizeRental(rentalId: string, totalValue: number): Promise<void> {
    const rentalIndex = this.rentals.findIndex(
      (rental) => rental._id.toString() === rentalId,
    )

    if (rentalIndex !== -1) {
      this.rentals[rentalIndex] = {
        ...this.rentals[rentalIndex],
        total: totalValue,
        endDate: new Date(),
      }
    }
  }
}
