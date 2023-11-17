import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/User/updateUserAvatar/UpdateUserAvatarController'
import { CreateNewUserController } from '../../../../modules/accounts/useCases/User/createNewUser/CreateNewUserController'
import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../../config/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { UpdateUserInfosController } from '../../../../modules/accounts/useCases/User/updateUserInfos/UpdateUserInfosController'

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))
const usersRoutes = Router()
const createNewUserController = new CreateNewUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const updateUserInfosController = new UpdateUserInfosController()

usersRoutes.post('/', createNewUserController.handle)

usersRoutes.put('/', ensureAuthenticated, updateUserInfosController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
)

export { usersRoutes }
