import { CreateCategoryController } from '../../../../modules/cars/useCases/Category/createCategory/CreateCategoryController'
import { importCategoryController } from '../../../../modules/cars/useCases/Category/importCategory/index'
import { Router } from 'express'
import { listCategoriesController } from '../../../../modules/cars/useCases/Category/listCategories'
import multer from 'multer'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'
const upload = multer({
  dest: './tmp',
})

const categoriesRoutes = Router()
const createCategoryController = new CreateCategoryController()

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle,
)

export { categoriesRoutes }
