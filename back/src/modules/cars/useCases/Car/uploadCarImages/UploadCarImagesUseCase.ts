import { AppError } from '../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICarsImagesRepository } from '../../../repositories/CarsImages/ICarsImagesRepository'

interface IRequest {
  carId: string
  imagesName: string[]
}

@injectable()
export class UploadCarImagesUseCase {
  carsImagesRepository: ICarsImagesRepository
  constructor(
    @inject('CarsImagesRepository') carsImagesRepository: ICarsImagesRepository,
  ) {
    this.carsImagesRepository = carsImagesRepository
  }

  async execute({ carId, imagesName }: IRequest): Promise<void> {
    if (!carId) throw new AppError('_id do carro não informado')

    imagesName.map(async (image) => {
      await this.carsImagesRepository.create(carId, image)
    })
  }
}
