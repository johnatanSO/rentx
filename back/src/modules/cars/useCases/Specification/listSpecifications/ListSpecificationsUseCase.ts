import { inject, injectable } from 'tsyringe'
import { Specification } from '../../../infra/mongoose/entities/Specification'
import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'

@injectable()
export class ListSpecificationsUseCase {
  specificationsRepository: ISpecificationsRepository
  constructor(
    @inject('SpecificationsRepository')
    specificationsRepository: ISpecificationsRepository,
  ) {
    this.specificationsRepository = specificationsRepository
  }

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list()
    return specifications
  }
}
