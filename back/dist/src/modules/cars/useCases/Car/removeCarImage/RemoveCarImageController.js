"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCarImageController = void 0;
const tsyringe_1 = require("tsyringe");
const RemoveCarImageUseCase_1 = require("./RemoveCarImageUseCase");
class RemoveCarImageController {
    async handle(req, res) {
        const { carId, imageId } = req.params;
        const removeCarImageUseCase = tsyringe_1.container.resolve(RemoveCarImageUseCase_1.RemoveCarImageUseCase);
        await removeCarImageUseCase.execute({
            carId,
            imageId,
        });
        return res.status(201).json({
            success: true,
            message: 'Imagem removida com sucesso',
        });
    }
}
exports.RemoveCarImageController = RemoveCarImageController;
