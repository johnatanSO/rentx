import { inject, injectable } from 'tsyringe'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { Rental } from '../../infra/mongoose/entities/Rental'

interface IRequest {
  filterStartDate: string
  filterEndDate: string
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
  }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.listAll({
      userId: undefined,
      filterStartDate,
      filterEndDate,
    })

    return rentals
  }
}
