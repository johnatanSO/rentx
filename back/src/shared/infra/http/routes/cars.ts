import { UploadCarImagesController } from '../../../../modules/cars/useCases/Car/uploadCarImages/UploadCarImagesController'
import { CreateCarSpecificationController } from './../../../../modules/cars/useCases/Car/createCarSpecification/CreateCarSpecificationController'
import express, { Router } from 'express'
import path from 'path'
import { ListAvaliableCarsController } from '../../../../modules/cars/useCases/Car/listAvaliableCars/ListAvaliableCarsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateCarController } from './../../../../modules/cars/useCases/Car/createCar/CreateCarController'
import uploadConfig from '../../../../config/upload'
import multer from 'multer'
import { GetCarInfoController } from '../../../../modules/cars/useCases/Car/getCarInfo/GetCarInfoController'
import { ListAllCarsController } from '../../../../modules/cars/useCases/Car/listAllCars/ListAllCarsController'
import { RemoveCarImageController } from '../../../../modules/cars/useCases/Car/removeCarImage/RemoveCarImageController'

const carsRoutes = Router()
const upload = multer(uploadConfig.upload('./tmp/cars'))
const createCarController = new CreateCarController()
const listAvaliableCarsController = new ListAvaliableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()
const getCarInfoController = new GetCarInfoController()
const listAllCarsController = new ListAllCarsController()
const removeCarImageController = new RemoveCarImageController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
)

carsRoutes.use(
  '/images',
  express.static(
    path.join(__dirname, '..', '..', '..', '..', '..', 'tmp', 'cars'),
  ),
)

carsRoutes.get('/avaliable', listAvaliableCarsController.handle)

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
  '/images/:carId',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
)

carsRoutes.delete(
  '/images/:carId/:imageId',
  ensureAuthenticated,
  ensureAdmin,
  removeCarImageController.handle,
)

export { carsRoutes }
