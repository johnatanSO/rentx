import { CreateRentalController } from './../../../../modules/rentals/useCases/createRental/CreateRentalController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ListRentalsController } from '../../../../modules/rentals/useCases/listRentals/ListRentalsController'

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const listRentalsController = new ListRentalsController()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)

rentalsRoutes.get('/', ensureAuthenticated, listRentalsController.handle)

export { rentalsRoutes }
