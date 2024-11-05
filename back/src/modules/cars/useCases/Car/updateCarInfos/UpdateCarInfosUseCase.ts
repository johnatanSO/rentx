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
    const car = await this.carsRepository.findById(carId)

    car.name = name
    car.description = description
    car.dailyRate = dailyRate
    car.avaliable = avaliable
    car.licensePlate = licensePlate
    car.fineAmount = fineAmount
    car.brand = brand
    car.categoryId = categoryId
    car.reasonUnavaliable = reasonUnavaliable
    car.transmission = transmission

    await this.carsRepository.update(car)
  }
}
