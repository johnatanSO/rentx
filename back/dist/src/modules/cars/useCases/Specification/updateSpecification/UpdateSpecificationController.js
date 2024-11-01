"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSpecificationController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateSpecificationUseCase_1 = require("./UpdateSpecificationUseCase");
class UpdateSpecificationController {
    async handle(req, res) {
        const { specificationId } = req.params;
        const { name, description } = req.body;
        const updateSpecificationUseCase = tsyringe_1.container.resolve(UpdateSpecificationUseCase_1.UpdateSpecificationUseCase);
        await updateSpecificationUseCase.execute({
            specificationId,
            name,
            description,
        });
        return res.status(201).json({
            success: true,
            message: 'Informações da especificação atualizadas com sucesso',
        });
    }
}
exports.UpdateSpecificationController = UpdateSpecificationController;
