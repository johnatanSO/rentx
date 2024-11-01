"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryController = void 0;
const CreateCategoryUseCase_1 = require("./CreateCategoryUseCase");
const tsyringe_1 = require("tsyringe");
class CreateCategoryController {
    async handle(req, res) {
        const { name, description } = req.body;
        const createCategoryUseCase = tsyringe_1.container.resolve(CreateCategoryUseCase_1.CreateCategoryUseCase);
        const createdCategory = await createCategoryUseCase.execute({
            name,
            description,
        });
        return res.status(201).json({
            success: true,
            title: 'Categoria cadastrada com sucesso',
            item: createdCategory,
        });
    }
}
exports.CreateCategoryController = CreateCategoryController;
