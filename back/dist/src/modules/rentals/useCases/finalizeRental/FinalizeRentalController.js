"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalizeRentalController = void 0;
const tsyringe_1 = require("tsyringe");
const FinalizeRentalUseCase_1 = require("./FinalizeRentalUseCase");
class FinalizeRentalController {
    async handle(req, res) {
        const { rentalId } = req.params;
        const { _id: userId } = req.user;
        const finalizeRentalUseCase = tsyringe_1.container.resolve(FinalizeRentalUseCase_1.FinalizeRentalUseCase);
        await finalizeRentalUseCase.execute({ rentalId, userId });
        return res.status(200).json({
            success: true,
            message: 'Aluguel finalizado com sucesso',
        });
    }
}
exports.FinalizeRentalController = FinalizeRentalController;
