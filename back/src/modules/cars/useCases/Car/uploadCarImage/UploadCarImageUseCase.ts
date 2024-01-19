import { AppError } from '../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICarsImagesRepository } from '../../../repositories/CarsImages/ICarsImagesRepository'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'

interface IRequest {
  carId: string
  image: {
    filename: string
    originalname: string
    buffer: Buffer
    mimetype: string
  }
}

@injectable()
export class UploadCarImageUseCase {
  carsImagesRepository: ICarsImagesRepository
  carsRepository: ICarsRepository
  storageProvider: IStorageProvider
  constructor(
    @inject('CarsImagesRepository') carsImagesRepository: ICarsImagesRepository,
    @inject('CarsRepository') carsRepository: ICarsRepository,
    @inject('FirebaseProvider') storageProvider: IStorageProvider,
  ) {
    this.carsImagesRepository = carsImagesRepository
    this.carsRepository = carsRepository
    this.storageProvider = storageProvider
  }

  async execute({ carId, image }: IRequest): Promise<void> {
    if (!carId) throw new AppError('_id do carro não informado')

    const { imageName, imageURL } =
      await this.storageProvider.uploadImage(image)

    const carImage = await this.carsImagesRepository.create({
      carId,
      imageName,
      path: imageURL,
    })

    await this.carsRepository.addImage(carId, carImage._id.toString())
  }
}
