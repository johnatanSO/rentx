"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRentalController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateRentalUseCase_1 = require("./CreateRentalUseCase");
class CreateRentalController {
    async handle(req, res) {
        const { carId, expectedReturnDate } = req.body;
        const { _id: userId } = req.user;
        const createRentalUseCase = tsyringe_1.container.resolve(CreateRentalUseCase_1.CreateRentalUseCase);
        const newRental = await createRentalUseCase.execute({
            userId,
            carId,
            expectedReturnDate,
        });
        return res.status(201).json({
            success: true,
            message: 'Aluguel cadastrado com sucesso',
            item: newRental,
        });
    }
}
exports.CreateRentalController = CreateRentalController;
