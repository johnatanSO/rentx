import { inject, injectable } from 'tsyringe'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { ICarsRepository } from '../../../cars/repositories/Cars/ICarsRepository'
import { AppError } from '../../../../shared/errors/AppError'
import dayjs from 'dayjs'
import { IUsersRepository } from '../../../accounts/repositories/Users/IUsersRepository'

interface IRequest {
  rentalId: string
  userId: string
}

@injectable()
export class FinalizeRentalUseCase {
  rentalsRepository: IRentalsRepository
  carsRepository: ICarsRepository
  usersRepository: IUsersRepository

  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
    @inject('CarsRepository') carsRepository: ICarsRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
  ) {
    this.rentalsRepository = rentalsRepository
    this.carsRepository = carsRepository
    this.usersRepository = usersRepository
  }

  async execute({ rentalId, userId }: IRequest) {
    if (!rentalId) throw new AppError('_id do aluguel não foi enviado')

    const rental = await this.rentalsRepository.findById(rentalId)

    if (!rental) throw new AppError('Aluguel não encontrado')

    const user = await this.usersRepository.findById(userId)

    if (!user.isAdmin && rental.user.toString() !== userId) {
      throw new AppError('O aluguel não pertence à este usuário')
    }

    if (rental.endDate) throw new AppError('Aluguel já foi finalizado')

    const car = await this.carsRepository.findById(rental.car.toString())

    const rentalDuration = dayjs(new Date()).diff(rental.startDate, 'day')
    const extraDays = dayjs(new Date()).diff(rental.expectedReturnDate, 'day')

    let rentalTotalValue =
      rentalDuration > 0 ? car.dailyRate * rentalDuration : car.dailyRate

    if (extraDays > 0) {
      rentalTotalValue = rentalTotalValue + car.fineAmount
    }

    await this.carsRepository.updateOne(car._id.toString(), {
      avaliable: true,
    })

    await this.rentalsRepository.finalizeRental(rentalId, rentalTotalValue)
  }
}
