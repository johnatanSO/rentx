"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateCategoryUseCase_1 = require("./UpdateCategoryUseCase");
class UpdateCategoryController {
    async handle(req, res) {
        const { categoryId } = req.params;
        const { name, description } = req.body;
        const updateCategoryUseCase = tsyringe_1.container.resolve(UpdateCategoryUseCase_1.UpdateCategoryUseCase);
        await updateCategoryUseCase.execute({
            categoryId,
            name,
            description,
        });
        return res.status(201).json({
            success: true,
            message: 'Informações da categoria atualizadas com sucesso',
        });
    }
}
exports.UpdateCategoryController = UpdateCategoryController;
