import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
import { AppError } from '../../../../../shared/errors/AppError'

interface IRequest {
  carId: string
  name: string
  description: string
  dailyRate: number
  avaliable: boolean
  licensePlate: string
  fineAmount: number
  brand: string
  categoryId: string
  reasonUnavaliable?: string
  transmission: string
}

@injectable()
export class UpdateCarInfosUseCase {
  carsRepository: ICarsRepository
  constructor(@inject('CarsRepository') carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository
  }

  async execute({
    carId,
    name,
    description,
    dailyRate,
    avaliable,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    reasonUnavaliable,
    transmission,
  }: IRequest): Promise<void> {
    if (!carId) throw new AppError('_id do carro não enviado')

    await this.carsRepository.updateOne(carId, {
      name,
      description,
      dailyRate,
      avaliable,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      reasonUnavaliable,
      transmission,
    })
  }
}
