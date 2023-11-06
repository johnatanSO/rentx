import { inject, injectable } from 'tsyringe'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { Rental } from '../../infra/mongoose/entities/Rental'

@injectable()
export class ListAllRentalsUseCase {
  rentalsRepository: IRentalsRepository
  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
  ) {
    this.rentalsRepository = rentalsRepository
  }

  async execute(): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.list(undefined)

    return rentals
  }
}
