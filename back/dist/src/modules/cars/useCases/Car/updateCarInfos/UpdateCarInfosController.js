"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarInfosController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateCarInfosUseCase_1 = require("./UpdateCarInfosUseCase");
class UpdateCarInfosController {
    async handle(req, res) {
        const { carId } = req.params;
        const { name, description, dailyRate, avaliable, licensePlate, fineAmount, brand, categoryId, reasonUnavaliable, transmission, } = req.body;
        const updateCarInfosUseCase = tsyringe_1.container.resolve(UpdateCarInfosUseCase_1.UpdateCarInfosUseCase);
        await updateCarInfosUseCase.execute({
            carId,
            name,
            description,
            dailyRate,
            avaliable,
            licensePlate,
            fineAmount,
            brand,
            categoryId,
            reasonUnavaliable,
            transmission,
        });
        return res.status(201).json({
            success: true,
            message: 'Informações do carro atualizadas com sucesso',
        });
    }
}
exports.UpdateCarInfosController = UpdateCarInfosController;
