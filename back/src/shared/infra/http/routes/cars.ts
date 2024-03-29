import { DeleteCarController } from './../../../../modules/cars/useCases/Car/deleteCar/DeleteCarController'
import { UploadCarImageController } from '../../../../modules/cars/useCases/Car/uploadCarImage/UploadCarImageController'
import { CreateCarSpecificationController } from './../../../../modules/cars/useCases/Car/createCarSpecification/CreateCarSpecificationController'
import { Router } from 'express'
import { ListAvaliableCarsController } from '../../../../modules/cars/useCases/Car/listAvaliableCars/ListAvaliableCarsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateCarController } from './../../../../modules/cars/useCases/Car/createCar/CreateCarController'
import multer from 'multer'
import { GetCarInfoController } from '../../../../modules/cars/useCases/Car/getCarInfo/GetCarInfoController'
import { ListAllCarsController } from '../../../../modules/cars/useCases/Car/listAllCars/ListAllCarsController'
import { RemoveCarImageController } from '../../../../modules/cars/useCases/Car/removeCarImage/RemoveCarImageController'
import { FavoriteCarController } from '../../../../modules/accounts/useCases/User/favoriteCar/FavoriteCarController'
import { UpdateCarInfosController } from '../../../../modules/cars/useCases/Car/updateCarInfos/UpdateCarInfosController'
import { UpdateDefaultCarImageController } from '../../../../modules/cars/useCases/Car/updateDefaultCarImage/UpdateDefaultCarImageController'
import uploadConfig from '../../../../config/upload'

const carsRoutes = Router()
const uploadImage = multer(uploadConfig)

const createCarController = new CreateCarController()
const listAvaliableCarsController = new ListAvaliableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImageController()
const updateDefaultCarImageController = new UpdateDefaultCarImageController()
const getCarInfoController = new GetCarInfoController()
const listAllCarsController = new ListAllCarsController()
const removeCarImageController = new RemoveCarImageController()
const favoriteCarController = new FavoriteCarController()
const updateCarInfosController = new UpdateCarInfosController()
const deleteCarController = new DeleteCarController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  uploadImage.single('image'),
  createCarController.handle,
)

carsRoutes.get('/avaliable', listAvaliableCarsController.handle)

carsRoutes.delete(
  '/:carId',
  ensureAuthenticated,
  ensureAdmin,
  deleteCarController.handle,
)

carsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  listAllCarsController.handle,
)

carsRoutes.get('/:carId', getCarInfoController.handle)

carsRoutes.post(
  '/specifications/:carId',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
)

carsRoutes.post(
  '/favorite/:carId',
  ensureAuthenticated,
  favoriteCarController.handle,
)

carsRoutes.put(
  '/:carId',
  ensureAuthenticated,
  ensureAdmin,
  updateCarInfosController.handle,
)

carsRoutes.patch(
  '/images/:carId',
  ensureAuthenticated,
  ensureAdmin,
  uploadImage.single('image'),
  uploadCarImagesController.handle,
)

carsRoutes.patch(
  '/images/default/:carId',
  ensureAuthenticated,
  ensureAdmin,
  uploadImage.single('defaultImage'),
  updateDefaultCarImageController.handle,
)

carsRoutes.delete(
  '/images/:carId/:imageId',
  ensureAuthenticated,
  ensureAdmin,
  removeCarImageController.handle,
)

export { carsRoutes }
