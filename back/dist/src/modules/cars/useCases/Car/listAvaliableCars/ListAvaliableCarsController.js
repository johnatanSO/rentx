"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAvaliableCarsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListAvaliableCarsUseCase_1 = require("./ListAvaliableCarsUseCase");
class ListAvaliableCarsController {
    async handle(req, res) {
        const { categoryId, name, brand } = req.query;
        const listAvaliableCarsUseCase = tsyringe_1.container.resolve(ListAvaliableCarsUseCase_1.ListAvaliableCarsUseCase);
        const cars = await listAvaliableCarsUseCase.execute({
            categoryId: categoryId,
            name: name,
            brand: brand,
        });
        return res.status(200).json({
            success: true,
            message: 'Busca de carros concluída com sucesso',
            items: cars,
        });
    }
}
exports.ListAvaliableCarsController = ListAvaliableCarsController;
