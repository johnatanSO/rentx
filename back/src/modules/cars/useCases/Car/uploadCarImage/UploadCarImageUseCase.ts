import { AppError } from '../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICarsImagesRepository } from '../../../repositories/CarsImages/ICarsImagesRepository'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
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

    const path = await this.storageProvider.uploadImage(image, 'cars')

    const carImage = await this.carsImagesRepository.create({
      carId,
      imageName: image,
      path,
    })

    await this.carsRepository.addImage(carId, carImage._id.toString())
  }
}
