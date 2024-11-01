"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadCarImageController = void 0;
const tsyringe_1 = require("tsyringe");
const UploadCarImageUseCase_1 = require("./UploadCarImageUseCase");
class UploadCarImageController {
    async handle(req, res) {
        const { carId } = req.params;
        const image = req.file.filename;
        const uploadCarImageUseCase = tsyringe_1.container.resolve(UploadCarImageUseCase_1.UploadCarImageUseCase);
        await uploadCarImageUseCase.execute({ carId, image });
        return res.status(201).json({
            success: true,
            message: 'Imagens do carro atualizadas com sucesso',
        });
    }
}
exports.UploadCarImageController = UploadCarImageController;
