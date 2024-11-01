"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarSpecificationController = void 0;
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
const tsyringe_1 = require("tsyringe");
class CreateCarSpecificationController {
    async handle(req, res) {
        const { carId } = req.params;
        const { specificationsIds } = req.body;
        const createCarSpecificationUseCase = tsyringe_1.container.resolve(CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase);
        await createCarSpecificationUseCase.execute({
            carId,
            specificationsIds,
        });
        return res.status(201).json({
            success: true,
            title: 'Especificações atualizadas com sucesso',
        });
    }
}
exports.CreateCarSpecificationController = CreateCarSpecificationController;
