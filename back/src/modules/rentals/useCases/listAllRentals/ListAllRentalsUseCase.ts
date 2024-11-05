import { inject, injectable } from 'tsyringe'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { Rental } from '../../infra/typeorm/entities/Rental'

interface IRequest {
  filterStartDate: string
  filterEndDate: string
  userId: string
  carId: string
}

@injectable()
export class ListAllRentalsUseCase {
  rentalsRepository: IRentalsRepository
  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
  ) {
    this.rentalsRepository = rentalsRepository
  }

  async execute({
    filterStartDate,
    filterEndDate,
    userId,
    carId,
  }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.listAll({
      userId,
      carId,
      filterStartDate,
      filterEndDate,
    })

    return rentals
  }
}
