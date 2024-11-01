import { inject, injectable } from 'tsyringe'
import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'
import { AppError } from '../../../../../shared/errors/AppError'

@injectable()
export class DeleteSpecificationUseCase {
  specificationsRepository: ISpecificationsRepository
  constructor(
    @inject('SpecificationsRepository')
    specificationsRepository: ISpecificationsRepository,
  ) {
    this.specificationsRepository = specificationsRepository
  }

  async execute(specificationId: string): Promise<void> {
    if (!specificationId) throw new AppError('_id da especificação não enviado')

    await this.specificationsRepository.delete(specificationId)
  }
}
