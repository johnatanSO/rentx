import { Specification } from '../../../infra/mongoose/entities/Specification'
import { SpecificationsRepository } from './../../../repositories/Specifitacions/SpecificationsRepository'

export class ListSpecificationsUseCase {
  specificationsRepository: SpecificationsRepository
  constructor(specificationsRepository: SpecificationsRepository) {
    this.specificationsRepository = specificationsRepository
  }

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list()
    return specifications
  }
}
