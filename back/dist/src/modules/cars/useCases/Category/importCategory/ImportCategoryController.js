"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportCategoryController = void 0;
const ImportCategoryUseCase_1 = require("./ImportCategoryUseCase");
const tsyringe_1 = require("tsyringe");
class ImportCategoryController {
    async handle(req, res) {
        const { file } = req;
        const importCategoryUseCase = tsyringe_1.container.resolve(ImportCategoryUseCase_1.ImportCategoryUseCase);
        const categories = await importCategoryUseCase.execute(file);
        return res.status(201).json({
            success: true,
            title: 'Categorias importadas com sucesso.',
            items: categories,
        });
    }
}
exports.ImportCategoryController = ImportCategoryController;
