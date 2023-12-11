import { Router } from 'express'
import { CreateSpecificationController } from '../../../../modules/cars/useCases/Specification/createSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '../../../../modules/cars/useCases/Specification/listSpecifications/ListSpecificationsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { DeleteSpecificationController } from '../../../../modules/cars/useCases/Specification/deleteSpecification/DeleteSpecificationController'
import { UpdateSpecificationController } from '../../../../modules/cars/useCases/Specification/updateSpecification/UpdateSpecificationController'

const specificationsRoutes = Router()
const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()
const deleteSpecificationController = new DeleteSpecificationController()
const updateSpecificationController = new UpdateSpecificationController()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
)

specificationsRoutes.put(
  '/:specificationId',
  ensureAuthenticated,
  ensureAdmin,
  updateSpecificationController.handle,
)

specificationsRoutes.get('/', listSpecificationsController.handle)

specificationsRoutes.delete(
  '/:specificationId',
  ensureAuthenticated,
  ensureAdmin,
  deleteSpecificationController.handle,
)

export { specificationsRoutes }
