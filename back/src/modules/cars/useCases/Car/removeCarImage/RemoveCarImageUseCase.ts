import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
import { ICarsImagesRepository } from '../../../repositories/CarsImages/ICarsImagesRepository'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'

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
    @inject('FirebaseProvider') storageProvider: IStorageProvider,
  ) {
    this.carsRepository = carsRepository
    this.carsImagesRepository = carsImagesRepository
    this.storageProvider = storageProvider
  }

  async execute({ carId, imageId }: IRequest): Promise<void> {
    await this.storageProvider.deleteImage()
    await this.carsRepository.removeImage(carId, imageId)
    await this.carsImagesRepository.delete(imageId)
  }
}
