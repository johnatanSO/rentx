"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllRentalsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListAllRentalsUseCase_1 = require("./ListAllRentalsUseCase");
class ListAllRentalsController {
    async handle(req, res) {
        const { filterStartDate, filterEndDate, userId, carId } = req.query;
        const listAllRentalsUseCase = tsyringe_1.container.resolve(ListAllRentalsUseCase_1.ListAllRentalsUseCase);
        const rentals = await listAllRentalsUseCase.execute({
            filterStartDate,
            filterEndDate,
            userId,
            carId,
        });
        return res.status(200).json({
            success: true,
            title: 'Busca de alugueis feita com sucesso',
            items: rentals,
        });
    }
}
exports.ListAllRentalsController = ListAllRentalsController;
