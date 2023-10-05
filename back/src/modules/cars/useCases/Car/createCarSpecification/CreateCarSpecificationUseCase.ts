import { ISpecificationsRepository } from './../../../repositories/Specifitacions/ISpecificationsRepository'
import { ICarsRepository } from './../../../repositories/Cars/ICarsRepository'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../../shared/errors/AppError'

interface IRequest {
  carId: string
  specificationsIds: string[]
}

@injectable()
export class CreateCarSpecificationUseCase {
  carsRepository: ICarsRepository
  specificationsRepository: ISpecificationsRepository
  constructor(
    @inject('CarsRepository') carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    specificationsRepository: ISpecificationsRepository,
  ) {
    this.carsRepository = carsRepository
    this.specificationsRepository = specificationsRepository
  }

  async execute({ carId, specificationsIds }: IRequest): Promise<void> {
    if (!carId) throw new AppError('_id o carro não foi ')

    const carExists = await this.carsRepository.findById(carId)

    if (!carExists) throw new AppError('Carro não existente')

    const specifications =
      await this.specificationsRepository.findByIds(specificationsIds)

    const newSpecificationsIds = specifications.map(
      (specification) => specification._id,
    )

    carExists.specifications = newSpecificationsIds

    await this.carsRepository.create(carExists)

    console.log('carExists', carExists)
  }
}
