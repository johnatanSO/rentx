import { AppError } from '../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICarsImagesRepository } from '../../../repositories/CarsImages/ICarsImagesRepository'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
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
    if (!car) throw new AppError('Carro não encontrado ')

    if (car.defaultImage) {
      await this.storageProvider.deleteImage(car.defaultImage.imageName, 'cars')
    }

    const path = await this.storageProvider.uploadImage(defaultImage, 'cars')

    const carImage = await this.carsImagesRepository.create({
      carId,
      imageName: defaultImage,
      path,
    })

    await this.carsRepository.updateOne(carId, {
      defaultImage: carImage._id.toString(),
    })
  }
}
