import { Router } from 'express'
import { ListAvaliableCarsController } from '../../../../modules/cars/useCases/Car/listAvaliableCars/ListAvaliableCarsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateCarController } from './../../../../modules/cars/useCases/Car/createCar/CreateCarController'

const carsRoutes = Router()
const createCarController = new CreateCarController()
const listAvaliableCarsController = new ListAvaliableCarsController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
)

carsRoutes.get('/avaliable', listAvaliableCarsController.handle)

export { carsRoutes }
