import { inject } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { Rental } from '../../infra/mongoose/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {
  userId: string
  carId: string
  expectedReturnDate: Date
}

export class CreateRentalUseCase {
  rentalsRepository: IRentalsRepository
  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
  ) {
    this.rentalsRepository = rentalsRepository
  }

  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const carUnavaliable =
      await this.rentalsRepository.findOpenRentalByCar(carId)

    if (carUnavaliable) {
      throw new AppError('Já existe um aluguel com este carro')
    }

    const rentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUser(userId)

    if (rentalOpenToUser) {
      throw new AppError('Usuário já possui um aluguel em andamento')
    }

    const newRental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    })

    return newRental
  }
}
