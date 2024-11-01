"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDefaultCarImageController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateDefaultCarImageUseCase_1 = require("./UpdateDefaultCarImageUseCase");
class UpdateDefaultCarImageController {
    async handle(req, res) {
        const { carId } = req.params;
        const defaultImage = req.file.filename;
        const updateDefaultCarImageUseCase = tsyringe_1.container.resolve(UpdateDefaultCarImageUseCase_1.UpdateDefaultCarImageUseCase);
        await updateDefaultCarImageUseCase.execute({ carId, defaultImage });
        return res.status(201).json({
            success: true,
            message: 'Imagem do carro atualizada com sucesso',
        });
    }
}
exports.UpdateDefaultCarImageController = UpdateDefaultCarImageController;
