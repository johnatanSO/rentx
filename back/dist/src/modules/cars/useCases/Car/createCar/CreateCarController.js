"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarController = void 0;
const CreateCarUseCase_1 = require("./CreateCarUseCase");
const tsyringe_1 = require("tsyringe");
class CreateCarController {
    async handle(req, res) {
        const { name, description, dailyRate, licensePlate, fineAmount, brand, categoryId, transmission, } = req.body;
        const defaultImage = req.file;
        const createCarUserCase = tsyringe_1.container.resolve(CreateCarUseCase_1.CreateCarUseCase);
        const newCar = await createCarUserCase.execute({
            name,
            description,
            dailyRate,
            licensePlate,
            fineAmount,
            brand,
            categoryId,
            transmission,
            defaultImage,
        });
        return res.status(201).json({
            success: true,
            item: newCar,
            message: 'Novo carro cadastrado com sucesso',
        });
    }
}
exports.CreateCarController = CreateCarController;
