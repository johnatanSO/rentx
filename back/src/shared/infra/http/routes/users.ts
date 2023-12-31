import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/User/updateUserAvatar/UpdateUserAvatarController'
import { CreateNewUserController } from '../../../../modules/accounts/useCases/User/createNewUser/CreateNewUserController'
import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../../config/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { UpdateUserInfosController } from '../../../../modules/accounts/useCases/User/updateUserInfos/UpdateUserInfosController'
import { ListFavoritedCarsController } from '../../../../modules/accounts/useCases/User/listFavoritedCars/ListFavoritedCarsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ListAllUsersController } from '../../../../modules/accounts/useCases/User/listAllUsers/ListAllUsersController'

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))
const usersRoutes = Router()
const createNewUserController = new CreateNewUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const updateUserInfosController = new UpdateUserInfosController()
const listFavoritedCarsController = new ListFavoritedCarsController()
const listAllUsersController = new ListAllUsersController()

usersRoutes.post('/', createNewUserController.handle)

usersRoutes.put('/', ensureAuthenticated, updateUserInfosController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
)

usersRoutes.get(
  '/favorite/list',
  ensureAuthenticated,
  listFavoritedCarsController.handle,
)

usersRoutes.get(
  '/list',
  ensureAuthenticated,
  ensureAdmin,
  listAllUsersController.handle,
)

export { usersRoutes }
