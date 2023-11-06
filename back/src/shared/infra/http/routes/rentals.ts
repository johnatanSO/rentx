import { FinalizeRentalController } from './../../../../modules/rentals/useCases/finalizeRental/FinalizeRentalController'
import { CreateRentalController } from './../../../../modules/rentals/useCases/createRental/CreateRentalController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ListRentalsController } from '../../../../modules/rentals/useCases/listRentals/ListRentalsController'
import { ListAllRentalsController } from '../../../../modules/rentals/useCases/listAllRentals/ListAllRentalsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const listRentalsController = new ListRentalsController()
const listAllRentalsController = new ListAllRentalsController()
const finalizeRentalController = new FinalizeRentalController()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)

rentalsRoutes.get('/', ensureAuthenticated, listRentalsController.handle)

rentalsRoutes.get(
  '/all',
  ensureAuthenticated,
  ensureAdmin,
  listAllRentalsController.handle,
)

rentalsRoutes.put(
  '/finalizeRental/:rentalId',
  ensureAuthenticated,
  finalizeRentalController.handle,
)

export { rentalsRoutes }
