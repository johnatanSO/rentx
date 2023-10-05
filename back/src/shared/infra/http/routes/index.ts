import { Router } from 'express'
import { authenticateRoutes } from './authenticate'
import { carsRoutes } from './cars'
import { categoriesRoutes } from './categories'
import { specificationsRoutes } from './specifications'
import { usersRoutes } from './users'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)
router.use('/users', usersRoutes)
router.use('/cars', carsRoutes)
router.use(authenticateRoutes)

export { router }
