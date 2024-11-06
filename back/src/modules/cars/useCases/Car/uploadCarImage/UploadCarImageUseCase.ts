import { AppError } from '../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICarsImagesRepository } from '../../../repositories/ICarsImagesRepository'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'

interface IRequest {
  carId: string
  image: string
}

@injectable()
export class UploadCarImageUseCase {
  carsImagesRepository: ICarsImagesRepository
  carsRepository: ICarsRepository
  storageProvider: IStorageProvider
  constructor(
    @inject('CarsImagesRepository') carsImagesRepository: ICarsImagesRepository,
    @inject('CarsRepository') carsRepository: ICarsRepository,
    @inject('StorageProvider') storageProvider: IStorageProvider,
  ) {
    this.carsImagesRepository = carsImagesRepository
    this.carsRepository = carsRepository
    this.storageProvider = storageProvider
  }

  async execute({ carId, image }: IRequest): Promise<void> {
    if (!carId) throw new AppError('_id do carro não informado')
    if (!image) throw new AppError('Imagem não enviada')

    const car = await this.carsRepository.findById(carId)
    if (!car) throw new AppError('Carro inválido')

    const path = await this.storageProvider.uploadImage(image, 'cars')

    const carImage = await this.carsImagesRepository.create({
      carId,
      imageName: image,
      path,
    })

    car.images.push(carImage)

    await this.carsRepository.update(car)
  }
}
