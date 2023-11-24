import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
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
  }: IRequest): Promise<void> {
    if (!carId) throw new AppError('_id do carro não enviado')

    const fields = {
      name,
      description,
      dailyRate,
      avaliable,
      licensePlate,
      fineAmount,
      brand,
      category: categoryId,
      reasonUnavaliable,
    }

    await this.carsRepository.updateOne(carId, fields)
  }
}
