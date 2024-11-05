import { inject, injectable } from 'tsyringe'
import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository'
import { Specification } from '../../../infra/typeorm/entities/Specification'

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
