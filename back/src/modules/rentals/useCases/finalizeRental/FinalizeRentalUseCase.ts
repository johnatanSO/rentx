import { inject, injectable } from 'tsyringe'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { ICarsRepository } from '../../../cars/repositories/Cars/ICarsRepository'
import { AppError } from '../../../../shared/errors/AppError'
import dayjs from 'dayjs'

interface IRequest {
  rentalId: string
  userId: string
}

@injectable()
export class FinalizeRentalUseCase {
  rentalsRepository: IRentalsRepository
  carsRepository: ICarsRepository

  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
    @inject('CarsRepository') carsRepository: ICarsRepository,
  ) {
    this.rentalsRepository = rentalsRepository
    this.carsRepository = carsRepository
  }

  async execute({ rentalId, userId }: IRequest) {
    if (!rentalId) throw new AppError('_id do aluguel não foi enviado')

    const rental = await this.rentalsRepository.findById(rentalId)

    if (!rental) throw new AppError('Aluguel não encontrado')
    if (rental.userId.toString() !== userId) {
      throw new AppError('O aluguel não pertence à este usuário')
    }

    const car = await this.carsRepository.findById(rental.car.toString())

    const rentalDuration = dayjs(new Date()).diff(rental.startDate, 'day')
    const extraDays = dayjs(new Date()).diff(rental.startDate, 'day')

    let rentalTotalValue = car.dailyRate * rentalDuration

    if (extraDays > 0) {
      rentalTotalValue = rentalTotalValue + car.fineAmount
    }

    await this.carsRepository.updateOne(car._id.toString(), {
      avaliable: true,
    })

    await this.rentalsRepository.finalizeRental(rentalId, rentalTotalValue)
  }
}
