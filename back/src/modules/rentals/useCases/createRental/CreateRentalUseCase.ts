import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { Rental } from '../../infra/mongoose/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'

interface IRequest {
  userId: string
  carId: string
  expectedReturnDate: Date
}

@injectable()
export class CreateRentalUseCase {
  rentalsRepository: IRentalsRepository
  dateProvider: IDateProvider
  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider') dateProvider: IDateProvider,
  ) {
    this.rentalsRepository = rentalsRepository
    this.dateProvider = dateProvider
  }

  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24

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

    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expectedReturnDate,
    )

    if (compare < minimumHour) {
      throw new AppError('Duração do aluguel deve ter no mínimo 24 horas')
    }

    const newRental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    })

    return newRental
  }
}
