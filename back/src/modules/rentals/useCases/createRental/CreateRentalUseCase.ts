import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'

import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'
import { Rental } from '../../infra/typeorm/entities/Rental'

interface IRequest {
  userId: string
  carId: string
  expectedReturnDate: Date
}

@injectable()
export class CreateRentalUseCase {
  rentalsRepository: IRentalsRepository
  dateProvider: IDateProvider
  carsRepository: ICarsRepository
  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider') dateProvider: IDateProvider,
    @inject('CarsRepository') carsRepository: ICarsRepository,
  ) {
    this.rentalsRepository = rentalsRepository
    this.dateProvider = dateProvider
    this.carsRepository = carsRepository
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

    const expectedReturnDateEndDay =
      this.dateProvider.endDay(expectedReturnDate)

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expectedReturnDateEndDay,
    )

    if (compare < minimumHour) {
      throw new AppError('Duração do aluguel deve ter no mínimo 24 horas')
    }

    const newRental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate: expectedReturnDateEndDay,
    })

    const car = await this.carsRepository.findById(carId)

    car.avaliable = false
    car.reasonUnavaliable = 'Carro está alugado no momento'

    await this.carsRepository.update(car)

    return newRental
  }
}
