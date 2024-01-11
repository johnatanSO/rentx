import { RefreshTokenController } from './../../../../modules/accounts/useCases/UserToken/refreshToken/RefreshTokenController'
import { Router } from 'express'
import { AuthenticateUserController } from '../../../../modules/accounts/useCases/User/authenticateUser/AuthenticateUserController'

const authenticateRoutes = Router()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post('/sessions', authenticateUserController.handle)

authenticateRoutes.post('/refreshToken', refreshTokenController.handle)

export { authenticateRoutes }
