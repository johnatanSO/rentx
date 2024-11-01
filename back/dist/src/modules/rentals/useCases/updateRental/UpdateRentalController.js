"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRentalController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateRentalUseCase_1 = require("./UpdateRentalUseCase");
class UpdateRentalController {
    async handle(req, res) {
        const { rentalId } = req.params;
        const { car, user, startDate, expectedReturnDate } = req.body;
        const updateRentalUseCase = tsyringe_1.container.resolve(UpdateRentalUseCase_1.UpdateRentalUseCase);
        await updateRentalUseCase.execute({
            rentalId,
            car,
            user,
            startDate,
            expectedReturnDate,
        });
        return res.status(201).json({
            success: true,
            message: 'Aluguel atualzado com sucesso',
        });
    }
}
exports.UpdateRentalController = UpdateRentalController;
