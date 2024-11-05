import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
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
    if (!carId) throw new AppError('_id do carro não informado')
    if (!specificationsIds) {
      throw new AppError('Especificações não informadas')
    }

    const carExists = await this.carsRepository.findById(carId)

    if (!carExists) throw new AppError('Carro não existente')

    const specifications =
      await this.specificationsRepository.findByIds(specificationsIds)

    carExists.specifications = specifications.map(
      (specification) => specification._id,
    ) as any

    await this.carsRepository.update(carExists)
  }
}
