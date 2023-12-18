import { inject, injectable } from 'tsyringe'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { Rental } from '../../infra/mongoose/entities/Rental'

interface IRequest {
  filterStartDate: string
  filterEndDate: string
  userId: string
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
  }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.listAll({
      userId,
      filterStartDate,
      filterEndDate,
    })

    return rentals
  }
}
