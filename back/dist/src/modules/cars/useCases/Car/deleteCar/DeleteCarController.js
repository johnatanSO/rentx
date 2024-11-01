"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCarController = void 0;
const tsyringe_1 = require("tsyringe");
const DeleteCarUseCase_1 = require("./DeleteCarUseCase");
class DeleteCarController {
    async handle(req, res) {
        const { carId } = req.params;
        const deleteCarUseCase = tsyringe_1.container.resolve(DeleteCarUseCase_1.DeleteCarUseCase);
        await deleteCarUseCase.execute(carId);
        return res.status(200).json({
            success: true,
            message: 'Carro deletado com sucesso',
        });
    }
}
exports.DeleteCarController = DeleteCarController;
