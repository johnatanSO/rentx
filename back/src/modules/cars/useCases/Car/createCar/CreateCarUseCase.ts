import { AppError } from './../../../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Car } from '../../../infra/mongoose/entities/Car'
import { ICarsRepository } from '../../../repositories/Cars/ICarsRepository'
import { ICarsImagesRepository } from '../../../repositories/CarsImages/ICarsImagesRepository'

interface IRequest {
  name: string
  description: string
  dailyRate: number
  licensePlate: string
  fineAmount: number
  brand: string
  categoryId: string
  transmission: string
  imageName: string
}

@injectable()
export class CreateCarUseCase {
  carsRepository: ICarsRepository
  carsImagesRepository: ICarsImagesRepository
  constructor(
    @inject('CarsRepository') carsRepository: ICarsRepository,
    @inject('CarsImagesRepository') carsImagesRepository: ICarsImagesRepository,
  ) {
    this.carsRepository = carsRepository
    this.carsImagesRepository = carsImagesRepository
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
    imageName,
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

    if (imageName) {
      const path = `cars/images/${imageName}`
      const carImage = await this.carsImagesRepository.create({
        carId: newCar._id.toString(),
        imageName,
        path,
      })

      await this.carsRepository.updateOne(newCar._id.toString(), {
        defaultImage: carImage._id,
      })
    }

    return newCar
  }
}
