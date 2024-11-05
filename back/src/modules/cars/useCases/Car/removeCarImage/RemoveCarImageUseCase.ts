import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
import { ICarsImagesRepository } from '../../../repositories/ICarsImagesRepository'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'
import { AppError } from '../../../../../shared/errors/AppError'

interface IRequest {
  carId: string
  imageId: string
}

@injectable()
export class RemoveCarImageUseCase {
  carsRepository: ICarsRepository
  carsImagesRepository: ICarsImagesRepository
  storageProvider: IStorageProvider
  constructor(
    @inject('CarsRepository') carsRepository: ICarsRepository,
    @inject('CarsImagesRepository') carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider') storageProvider: IStorageProvider,
  ) {
    this.carsRepository = carsRepository
    this.carsImagesRepository = carsImagesRepository
    this.storageProvider = storageProvider
  }

  async execute({ carId, imageId }: IRequest): Promise<void> {
    if (!imageId) throw new AppError('_id da imagem não enviado')
    if (!carId) throw new AppError('_id do carro não enviado')

    const car = await this.carsRepository.findById(carId)
    if (!car) throw new AppError('Carro inválido')

    const image = await this.carsImagesRepository.findById(imageId)
    if (!image) throw new AppError('Imagem não encontrada')

    await this.storageProvider.deleteImage(image.imageName, 'folder')

    car.images = car.images.filter((carImage) => (carImage as any) !== imageId)
    await this.carsRepository.update(car)

    await this.carsImagesRepository.delete(imageId)
  }
}
