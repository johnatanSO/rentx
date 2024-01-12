import { Router } from 'express'
import { authenticateRoutes } from './authenticate'
import { carsRoutes } from './cars'
import { categoriesRoutes } from './categories'
import { rentalsRoutes } from './rentals'
import { specificationsRoutes } from './specifications'
import { usersRoutes } from './users'
import { passwordRoutes } from './password'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)
router.use('/users', usersRoutes)
router.use('/cars', carsRoutes)
router.use('/rentals', rentalsRoutes)
router.use('/rentals', rentalsRoutes)
router.use('/password', passwordRoutes)
router.use(authenticateRoutes)

export { router }
