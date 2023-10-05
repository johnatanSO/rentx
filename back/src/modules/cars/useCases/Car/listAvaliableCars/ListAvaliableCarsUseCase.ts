import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
import { inject, injectable } from 'tsyringe'
import { Car } from '../../../infra/mongoose/entities/Car'

interface IRequest {
  name?: string
  categoryId?: string
  brand?: string
}

@injectable()
export class ListAvaliableCarsUseCase {
  carsRepository: ICarsRepository
  constructor(@inject('CarsRepository') carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository
  }

  async execute({ name, categoryId, brand }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.listAvaliable(
      categoryId,
      brand,
      name,
    )

    return cars
  }
}
