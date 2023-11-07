import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
import { ICarsImagesRepository } from '../../../repositories/CarsImages/ICarsImagesRepository'

interface IRequest {
  carId: string
  imageId: string
}

@injectable()
export class RemoveCarImageUseCase {
  carsRepository: ICarsRepository
  carsImagesRepository: ICarsImagesRepository
  constructor(
    @inject('CarsRepository') carsRepository: ICarsRepository,
    @inject('CarsImagesRepository') carsImagesRepository: ICarsImagesRepository,
  ) {
    this.carsRepository = carsRepository
    this.carsImagesRepository = carsImagesRepository
  }

  async execute({ carId, imageId }: IRequest): Promise<void> {
    await this.carsRepository.removeImage(carId, imageId)
    await this.carsImagesRepository.delete(imageId)
  }
}
