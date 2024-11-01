"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFavoritedCarsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListFavoritedCarsUseCase_1 = require("./ListFavoritedCarsUseCase");
class ListFavoritedCarsController {
    async handle(req, res) {
        const { _id: userId } = req.user;
        const listFavoritedCarsUseCase = tsyringe_1.container.resolve(ListFavoritedCarsUseCase_1.ListFavoritedCarsUseCase);
        const favoritedCars = await listFavoritedCarsUseCase.execute(userId);
        return res.status(200).json({
            success: true,
            message: 'Busca de carros favoritos realizada com sucesso',
            items: favoritedCars,
        });
    }
}
exports.ListFavoritedCarsController = ListFavoritedCarsController;
