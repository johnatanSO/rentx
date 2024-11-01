"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryController = void 0;
const tsyringe_1 = require("tsyringe");
const DeleteCategoryUseCase_1 = require("./DeleteCategoryUseCase");
class DeleteCategoryController {
    async handle(req, res) {
        const { categoryId } = req.params;
        const deleteCategoryUseCase = tsyringe_1.container.resolve(DeleteCategoryUseCase_1.DeleteCategoryUseCase);
        await deleteCategoryUseCase.execute(categoryId);
        return res.status(200).json({
            success: true,
            message: 'Categoria deletada com sucesso',
        });
    }
}
exports.DeleteCategoryController = DeleteCategoryController;
