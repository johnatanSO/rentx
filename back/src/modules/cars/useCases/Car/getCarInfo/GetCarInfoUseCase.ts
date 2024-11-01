import { AppError } from '../../../../../shared/errors/AppError'
import { Car } from '../../../infra/mongoose/entities/Car'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetCarInfoUseCase {
  carsRepository: ICarsRepository
  constructor(@inject('CarsRepository') carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository
  }

  async execute(carId: string): Promise<Car> {
    if (!carId) throw new AppError('carId não foi informado')

    const car = await this.carsRepository.findById(carId)

    return car
  }
}
