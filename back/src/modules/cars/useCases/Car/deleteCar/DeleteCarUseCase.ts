import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../../shared/errors/AppError'
import { ICarsRepository } from '../../../repositories/ICarsRepository'

@injectable()
export class DeleteCarUseCase {
  carsRepository: ICarsRepository
  constructor(@inject('CarsRepository') carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository
  }

  async execute(carId: string): Promise<void> {
    if (!carId) throw new AppError('_id do carro não foi enviado')

    await this.carsRepository.delete(carId)
  }
}
