import { UploadCarImagesController } from '../../../../modules/cars/useCases/Car/uploadCarImages/UploadCarImagesController'
import { CreateCarSpecificationController } from './../../../../modules/cars/useCases/Car/createCarSpecification/CreateCarSpecificationController'
import { Router } from 'express'
import { ListAvaliableCarsController } from '../../../../modules/cars/useCases/Car/listAvaliableCars/ListAvaliableCarsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateCarController } from './../../../../modules/cars/useCases/Car/createCar/CreateCarController'
import uploadConfig from '../../../../config/upload'
import multer from 'multer'

const carsRoutes = Router()
const upload = multer(uploadConfig.upload('./tmp/cars'))
const createCarController = new CreateCarController()
const listAvaliableCarsController = new ListAvaliableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
)

carsRoutes.get('/avaliable', listAvaliableCarsController.handle)

carsRoutes.post(
  '/specifications/:carId',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
)

carsRoutes.post(
  '/images/:carId',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
)

export { carsRoutes }
