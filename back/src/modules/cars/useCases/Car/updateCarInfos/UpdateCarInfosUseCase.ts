import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
import { AppError } from '../../../../../shared/errors/AppError'

interface IRequest {
  carId: string
  name: string
  description: string
}

@injectable()
export class UpdateCarInfosUseCase {
  carsRepository: ICarsRepository
  constructor(@inject('CarsRepository') carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository
  }

  async execute({ carId, name, description }: IRequest): Promise<void> {
    if (!carId) throw new AppError('_id do carro não enviado')

    const fields = {
      name,
      description,
    }

    await this.carsRepository.updateOne(carId, fields)
  }
}
