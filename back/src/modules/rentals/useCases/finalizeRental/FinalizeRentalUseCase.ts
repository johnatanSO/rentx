import { inject, injectable } from 'tsyringe'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { ICarsRepository } from '../../../cars/repositories/Cars/ICarsRepository'
import { AppError } from '../../../../shared/errors/AppError'
import { IUsersRepository } from '../../../accounts/repositories/Users/IUsersRepository'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'

interface IRequest {
  rentalId: string
  userId: string
}

@injectable()
export class FinalizeRentalUseCase {
  rentalsRepository: IRentalsRepository
  carsRepository: ICarsRepository
  usersRepository: IUsersRepository
  dateProvider: IDateProvider

  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
    @inject('CarsRepository') carsRepository: ICarsRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('DayjsDateProvider') dateProvider: IDateProvider,
  ) {
    this.rentalsRepository = rentalsRepository
    this.carsRepository = carsRepository
    this.usersRepository = usersRepository
    this.dateProvider = dateProvider
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

    const dateNow = this.dateProvider.dateNow()

    const rentalDuration = this.dateProvider.compareInDays(
      rental.startDate,
      dateNow,
    )

    const extraDays = this.dateProvider.compareInDays(
      rental.expectedReturnDate,
      dateNow,
    )

    let rentalTotalValue =
      rentalDuration > 0 ? car.dailyRate * rentalDuration : car.dailyRate

    if (extraDays > 0) {
      const fineTotal = extraDays * car.fineAmount
      rentalTotalValue = fineTotal + rentalTotalValue
    }

    await this.carsRepository.updateOne(car._id.toString(), {
      avaliable: true,
    })

    await this.rentalsRepository.finalizeRental(rentalId, rentalTotalValue)
  }
}
