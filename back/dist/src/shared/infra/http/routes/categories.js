"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const CreateCategoryController_1 = require("../../../../modules/cars/useCases/Category/createCategory/CreateCategoryController");
const ImportCategoryController_1 = require("../../../../modules/cars/useCases/Category/importCategory/ImportCategoryController");
const express_1 = require("express");
const ListCategoriesController_1 = require("../../../../modules/cars/useCases/Category/listCategories/ListCategoriesController");
const multer_1 = __importDefault(require("multer"));
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const ensureAdmin_1 = require("../middlewares/ensureAdmin");
const DeleteCategoryController_1 = require("../../../../modules/cars/useCases/Category/deleteCategory/DeleteCategoryController");
const UpdateCategoryController_1 = require("../../../../modules/cars/useCases/Category/updateCategory/UpdateCategoryController");
const upload = (0, multer_1.default)({
    dest: './tmp',
});
const categoriesRoutes = (0, express_1.Router)();
exports.categoriesRoutes = categoriesRoutes;
const createCategoryController = new CreateCategoryController_1.CreateCategoryController();
const importCategoryController = new ImportCategoryController_1.ImportCategoryController();
const listCategoriesController = new ListCategoriesController_1.ListCategoriesController();
const deleteCategoryController = new DeleteCategoryController_1.DeleteCategoryController();
const updateCategoryController = new UpdateCategoryController_1.UpdateCategoryController();
categoriesRoutes.post('/', ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryController.handle);
categoriesRoutes.put('/:categoryId', ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, updateCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.delete('/:categoryId', ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, deleteCategoryController.handle);
categoriesRoutes.post('/import', ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, upload.single('file'), importCategoryController.handle);
