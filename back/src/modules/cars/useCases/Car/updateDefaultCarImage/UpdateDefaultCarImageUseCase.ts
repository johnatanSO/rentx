import { AppError } from '../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICarsImagesRepository } from '../../../repositories/CarsImages/ICarsImagesRepository'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'

interface IRequest {
  carId: string
  defaultImage: {
    filename: string
    originalname: string
    buffer: Buffer
    mimetype: string
  }
}

@injectable()
export class UpdateDefaultCarImageUseCase {
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

  async execute({ carId, defaultImage }: IRequest): Promise<void> {
    if (!carId) throw new AppError('_id do carro não informado')

    const car = await this.carsRepository.findById(carId)
    if (!car) throw new AppError('Carro não encontrado ')

    if (car.defaultImage) {
      await this.storageProvider.deleteImage(car.defaultImage.imageName)
    }

    const { imageName, imageURL } = await this.storageProvider.uploadImage(
      'cars',
      defaultImage,
    )

    const carImage = await this.carsImagesRepository.create({
      carId,
      imageName,
      path: imageURL,
    })

    await this.carsRepository.updateOne(carId, {
      defaultImage: carImage._id.toString(),
    })
  }
}
