import { Specification } from '../../../infra/mongoose/entities/Specification'
import { inject, injectable } from 'tsyringe'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../../../repositories/Specifitacions/ISpecificationsRepository'
import { AppError } from '../../../../../shared/errors/AppError'

@injectable()
export class CreateSpecificationUseCase {
  specificationsRepository: ISpecificationsRepository
  constructor(
    @inject('SpecificationsRepository')
    specificationsRepository: ISpecificationsRepository,
  ) {
    this.specificationsRepository = specificationsRepository
  }

  async execute({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const alreadyExistSpecification =
      await this.specificationsRepository.findByName(name)

    if (alreadyExistSpecification)
      throw new AppError('Já existe uma especificação com este nome')

    const newSpecification = await this.specificationsRepository.create({
      name,
      description,
    })

    return newSpecification
  }
}
