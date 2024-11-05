import { inject, injectable } from 'tsyringe'
import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'
import { AppError } from '../../../../../shared/errors/AppError'

interface IRequest {
  specificationId: string
  name: string
  description: string
}

@injectable()
export class UpdateSpecificationUseCase {
  specificationsRepository: ISpecificationsRepository
  constructor(
    @inject('SpecificationsRepository')
    specificationsRepository: ISpecificationsRepository,
  ) {
    this.specificationsRepository = specificationsRepository
  }

  async execute({
    specificationId,
    name,
    description,
  }: IRequest): Promise<void> {
    if (!specificationId) throw new AppError('_id da especificação não enviado')

    const specification =
      await this.specificationsRepository.findById(specificationId)

    if (!specification) throw new AppError('_id da especificação inválido')

    specification.name = name
    specification.description = description

    await this.specificationsRepository.update(specification)
  }
}
