import { FinalizeRentalController } from './../../../../modules/rentals/useCases/finalizeRental/FinalizeRentalController'
import { CreateRentalController } from './../../../../modules/rentals/useCases/createRental/CreateRentalController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ListRentalsController } from '../../../../modules/rentals/useCases/listRentals/ListRentalsController'

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const listRentalsController = new ListRentalsController()
const finalizeRentalController = new FinalizeRentalController()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)

rentalsRoutes.get('/', ensureAuthenticated, listRentalsController.handle)

rentalsRoutes.put(
  '/finalizeRental/:rentalId',
  ensureAuthenticated,
  finalizeRentalController.handle,
)

export { rentalsRoutes }
