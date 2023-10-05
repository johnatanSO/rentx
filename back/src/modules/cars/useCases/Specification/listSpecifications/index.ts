import { SpecificationsRepository } from './../../../repositories/Specifitacions/SpecificationsRepository'
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'
import { ListSpecificationsController } from './ListSpecificationsController'

const specificationsRepository = new SpecificationsRepository()

const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specificationsRepository,
)

export const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsUseCase,
)
