import { ResetPasswordUserController } from './../../../../modules/accounts/useCases/User/resetPasswordUser/ResetPasswordUserController'
import { SendForgotPasswordMailController } from './../../../../modules/accounts/useCases/User/sendForgotPasswordMail/SendForgotPasswordMailController'
import { Router } from 'express'

const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController()

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle)
passwordRoutes.post('/reset', resetPasswordUserController.handle)

export { passwordRoutes }
