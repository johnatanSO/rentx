import { Router } from 'express'
import { CreateSpecificationController } from '../../../../modules/cars/useCases/Specification/createSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '../../../../modules/cars/useCases/Specification/listSpecifications/ListSpecificationsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { DeleteSpecificationController } from '../../../../modules/cars/useCases/Specification/deleteSpecification/DeleteSpecificationController'

const specificationsRoutes = Router()
const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()
const deleteSpecificationController = new DeleteSpecificationController()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
)

specificationsRoutes.get('/', listSpecificationsController.handle)

specificationsRoutes.delete(
  '/:specificationId',
  ensureAuthenticated,
  ensureAdmin,
  deleteSpecificationController.handle,
)

export { specificationsRoutes }
