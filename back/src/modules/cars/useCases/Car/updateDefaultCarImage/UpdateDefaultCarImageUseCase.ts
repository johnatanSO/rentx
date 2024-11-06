import { AppError } from '../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICarsImagesRepository } from '../../../repositories/ICarsImagesRepository'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'

interface IRequest {
  carId: string
  defaultImage: string
}

@injectable()
export class UpdateDefaultCarImageUseCase {
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

  async execute({ carId, defaultImage }: IRequest): Promise<void> {
    if (!defaultImage) throw new AppError('Imagem não enviada')
    if (!carId) throw new AppError('_id do carro não informado')

    const car = await this.carsRepository.findById(carId)
    if (!car) throw new AppError('Carro não encontrado')

    if (car.defaultImage) {
      await this.storageProvider.deleteImage(car.defaultImage.imageName, 'cars')
      car.defaultImage = null
    }

    const path = await this.storageProvider.uploadImage(defaultImage, 'cars')

    const carImage = await this.carsImagesRepository.create({
      carId,
      imageName: defaultImage,
      path,
    })

    car.defaultImage = carImage
    car.defaultImageId = carImage._id

    await this.carsRepository.update(car)
  }
}
