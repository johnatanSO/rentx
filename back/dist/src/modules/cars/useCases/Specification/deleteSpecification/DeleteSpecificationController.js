"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSpecificationController = void 0;
const tsyringe_1 = require("tsyringe");
const DeleteSpecificationUseCase_1 = require("./DeleteSpecificationUseCase");
class DeleteSpecificationController {
    async handle(req, res) {
        const { specificationId } = req.params;
        const deleteSpecificationUseCase = tsyringe_1.container.resolve(DeleteSpecificationUseCase_1.DeleteSpecificationUseCase);
        await deleteSpecificationUseCase.execute(specificationId);
        return res.status(200).json({
            success: true,
            message: 'Especificação deletada com sucesso',
        });
    }
}
exports.DeleteSpecificationController = DeleteSpecificationController;
