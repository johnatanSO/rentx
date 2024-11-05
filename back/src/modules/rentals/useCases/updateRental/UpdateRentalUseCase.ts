import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'

interface IRequest {
  rentalId: string
  car: string
  user: string
  startDate: Date
  expectedReturnDate: Date
}

@injectable()
export class UpdateRentalUseCase {
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
    rentalId,
    car,
    user,
    startDate,
    expectedReturnDate,
  }: IRequest): Promise<void> {
    if (!rentalId) throw new AppError('_id do aluguel não foi enviado')

    const rental = await this.rentalsRepository.findById(rentalId)

    if (!rental) throw new AppError('_id do aluguel inválido')
    if (rental.endDate) {
      throw new AppError(
        'Não é possível editar este aluguel por que ele já foi finalizado',
      )
    }

    const minimumHour = 24

    if (rental.car.toString() !== car) {
      const carUnavaliable =
        await this.rentalsRepository.findOpenRentalByCar(car)

      if (carUnavaliable) {
        throw new AppError('Já existe um aluguel com este carro')
      }
    }

    if (rental.user.toString() !== user) {
      const rentalOpenToUser =
        await this.rentalsRepository.findOpenRentalByUser(user)

      if (rentalOpenToUser) {
        throw new AppError('Usuário já possui um aluguel em andamento')
      }
    }

    const expectedReturnDateEndDay =
      this.dateProvider.endDay(expectedReturnDate)

    const compare = this.dateProvider.compareInHours(
      startDate,
      expectedReturnDateEndDay,
    )

    if (compare < minimumHour) {
      throw new AppError('Duração do aluguel deve ter no mínimo 24 horas')
    }

    const utcStartDate = this.dateProvider.convertToUTC(startDate)

    rental.carId = car
    rental.userId = user
    rental.startDate = new Date(utcStartDate)
    rental.expectedReturnDate = expectedReturnDateEndDay

    await this.rentalsRepository.update(rental)
  }
}
