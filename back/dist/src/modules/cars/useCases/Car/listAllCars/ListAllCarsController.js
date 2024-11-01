"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllCarsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListAllCarsUseCase_1 = require("./ListAllCarsUseCase");
class ListAllCarsController {
    async handle(req, res) {
        const listAllCarsUseCase = tsyringe_1.container.resolve(ListAllCarsUseCase_1.ListAllCarsUseCase);
        const allCars = await listAllCarsUseCase.execute();
        return res.status(200).json({
            success: true,
            title: 'Busca de carros feita com sucesso',
            items: allCars,
        });
    }
}
exports.ListAllCarsController = ListAllCarsController;
