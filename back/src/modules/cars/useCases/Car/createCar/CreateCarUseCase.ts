import { AppError } from './../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
import { ICarsImagesRepository } from '../../../repositories/ICarsImagesRepository'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'
import { Car } from '../../../infra/typeorm/entities/Car'

interface IRequest {
  name: string
  description: string
  dailyRate: number
  licensePlate: string
  fineAmount: number
  brand: string
  categoryId: string
  transmission: string
  defaultImage?: string
}

@injectable()
export class CreateCarUseCase {
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

  async execute({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    transmission,
    defaultImage,
  }: IRequest): Promise<Car> {
    if (!licensePlate) throw new AppError('Placa do carro não informada')

    const carAlreadyExists =
      await this.carsRepository.findByLicensePlate(licensePlate)

    if (carAlreadyExists) throw new AppError('Placa de carro já cadastrada')

    const newCar = await this.carsRepository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      transmission,
    })

    if (defaultImage) {
      const imageURL = await this.storageProvider.uploadImage(
        defaultImage,
        'cars',
      )

      const carImage = await this.carsImagesRepository.create({
        carId: newCar._id,
        imageName: defaultImage,
        path: imageURL,
      })

      newCar.defaultImageId = carImage._id

      await this.carsRepository.update(newCar)

      return await this.carsRepository.findById(newCar._id)
    }

    return newCar
  }
}
