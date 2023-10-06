import { Router } from 'express'
import { CreateSpecificationController } from '../../../../modules/cars/useCases/Specification/createSpecification/CreateSpecificationController'
import { listSpecificationsController } from '../../../../modules/cars/useCases/Specification/listSpecifications'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const specificationsRoutes = Router()
const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
)

specificationsRoutes.get('/', listSpecificationsController.handle)

export { specificationsRoutes }
