"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRentalsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListRentalsUseCase_1 = require("./ListRentalsUseCase");
class ListRentalsController {
    async handle(req, res) {
        const { _id: userId } = req.user;
        const listRentalsUseCase = tsyringe_1.container.resolve(ListRentalsUseCase_1.ListRentalsUseCase);
        const rentals = await listRentalsUseCase.execute(userId);
        return res.status(200).json({
            success: true,
            title: 'Busca de alugueis feita com sucesso',
            items: rentals,
        });
    }
}
exports.ListRentalsController = ListRentalsController;
