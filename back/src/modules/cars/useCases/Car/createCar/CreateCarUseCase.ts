import { AppError } from './../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Car } from '../../../infra/mongoose/entities/Car'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
import { ICarsImagesRepository } from '../../../repositories/CarsImages/ICarsImagesRepository'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'

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
    @inject('StorageProvider') storageProvider: IStorageProvider,
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
        carId: newCar._id.toString(),
        imageName: defaultImage,
        path: imageURL,
      })

      await this.carsRepository.updateOne(newCar._id.toString(), {
        defaultImage: carImage._id.toString(),
      })

      return await this.carsRepository.findById(newCar._id.toString())
    }

    return newCar
  }
}
