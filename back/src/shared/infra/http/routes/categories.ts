import { CreateCategoryController } from '../../../../modules/cars/useCases/Category/createCategory/CreateCategoryController'
import { ImportCategoryController } from '../../../../modules/cars/useCases/Category/importCategory/ImportCategoryController'
import { Router } from 'express'
import { ListCategoriesController } from '../../../../modules/cars/useCases/Category/listCategories/ListCategoriesController'
import multer from 'multer'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { DeleteCategoryController } from '../../../../modules/cars/useCases/Category/deleteCategory/DeleteCategoryController'
const upload = multer({
  dest: './tmp',
})

const categoriesRoutes = Router()
const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()
const deleteCategoryController = new DeleteCategoryController()

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.delete(
  '/:categoryId',
  ensureAuthenticated,
  ensureAdmin,
  deleteCategoryController.handle,
)

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle,
)

export { categoriesRoutes }
