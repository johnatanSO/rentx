import { AppError } from '../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICarsImagesRepository } from '../../../repositories/CarsImages/ICarsImagesRepository'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'

interface IRequest {
  carId: string
  imageName: string
}

@injectable()
export class UpdateDefaultCarImageUseCase {
  carsImagesRepository: ICarsImagesRepository
  carsRepository: ICarsRepository
  constructor(
    @inject('CarsImagesRepository') carsImagesRepository: ICarsImagesRepository,
    @inject('CarsRepository') carsRepository: ICarsRepository,
  ) {
    this.carsImagesRepository = carsImagesRepository
    this.carsRepository = carsRepository
  }

  async execute({ carId, imageName }: IRequest): Promise<void> {
    if (!carId) throw new AppError('_id do carro não informado')

    const path = `cars/images/${imageName}`
    const carImage = await this.carsImagesRepository.create({
      carId,
      imageName,
      path,
    })

    await this.carsRepository.updateOne(carId, {
      defaultImage: carImage._id.toString(),
    })
  }
}
