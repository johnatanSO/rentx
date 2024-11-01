"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteCarController = void 0;
const tsyringe_1 = require("tsyringe");
const FavoriteCarUseCase_1 = require("./FavoriteCarUseCase");
class FavoriteCarController {
    async handle(req, res) {
        const { carId } = req.params;
        const { _id: userId } = req.user;
        const favoriteCarUseCase = tsyringe_1.container.resolve(FavoriteCarUseCase_1.FavoriteCarUseCase);
        const updatedUser = await favoriteCarUseCase.execute({ carId, userId });
        return res.status(201).json({
            success: true,
            message: 'Sucesso',
            user: updatedUser,
        });
    }
}
exports.FavoriteCarController = FavoriteCarController;
