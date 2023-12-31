import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
import { Car } from '../../../infra/mongoose/entities/Car'

@injectable()
export class ListAllCarsUseCase {
  carsRepository: ICarsRepository
  constructor(@inject('CarsRepository') carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository
  }

  async execute(): Promise<Car[]> {
    const allCars = await this.carsRepository.listAll()
    return allCars
  }
}
