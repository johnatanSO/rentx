import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/User/updateUserAvatar/UpdateUserAvatarController'
import { CreateNewUserController } from '../../../../modules/accounts/useCases/User/createNewUser/CreateNewUserController'
import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../../config/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))
const usersRoutes = Router()
const createNewUserController = new CreateNewUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createNewUserController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
)

export { usersRoutes }
