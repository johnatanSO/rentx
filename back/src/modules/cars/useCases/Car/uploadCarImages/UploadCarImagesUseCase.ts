import { AppError } from '../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICarsImagesRepository } from '../../../repositories/CarsImages/ICarsImagesRepository'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'

interface IRequest {
  carId: string
  imagesName: string[]
}

@injectable()
export class UploadCarImagesUseCase {
  carsImagesRepository: ICarsImagesRepository
  carsRepository: ICarsRepository
  constructor(
    @inject('CarsImagesRepository') carsImagesRepository: ICarsImagesRepository,
    @inject('CarsRepository') carsRepository: ICarsRepository,
  ) {
    this.carsImagesRepository = carsImagesRepository
    this.carsRepository = carsRepository
  }

  async execute({ carId, imagesName }: IRequest): Promise<void> {
    if (!carId) throw new AppError('_id do carro não informado')

    imagesName.map(async (imageName) => {
      const path = `cars/images/${imageName}`
      const carImage = await this.carsImagesRepository.create({
        carId,
        imageName,
        path,
      })

      await this.carsRepository.addImage(carId, carImage._id.toString())
    })
  }
}
