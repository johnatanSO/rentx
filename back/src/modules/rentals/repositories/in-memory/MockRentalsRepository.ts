import { IRentalsRepository } from '../IRentalsRepository'
import dayjs from 'dayjs'
import { Rental } from '../../infra/typeorm/entities/Rental'
import { ICreateRentalDTO, IListRentalsDTO } from '../../dtos/Rental'

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

  async update(data: Rental): Promise<void> {
    const retanlIndex = this.rentals.findIndex(
      (rental) => rental._id.toString() === data._id,
    )

    this.rentals[retanlIndex] = {
      ...this.rentals[retanlIndex],
      ...data,
    }
  }

  async create({
    userId,
    carId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const newRental = new Rental({
      carId,
      expectedReturnDate,
      userId,
    })

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
}
