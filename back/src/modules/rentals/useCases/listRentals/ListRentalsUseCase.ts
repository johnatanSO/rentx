import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { Rental } from '../../infra/typeorm/entities/Rental'

@injectable()
export class ListRentalsUseCase {
  rentalsRepository: IRentalsRepository
  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
  ) {
    this.rentalsRepository = rentalsRepository
  }

  async execute(userId: string): Promise<Rental[]> {
    if (!userId) throw new AppError('_id do usuário não foi enviado')

    const rentals = await this.rentalsRepository.list(userId)

    return rentals
  }
}
