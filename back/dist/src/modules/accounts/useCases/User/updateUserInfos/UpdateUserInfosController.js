"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserInfosController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateUserInfosUseCase_1 = require("./UpdateUserInfosUseCase");
class UpdateUserInfosController {
    async handle(req, res) {
        const { name, email, isAdmin } = req.body;
        const { _id: userId } = req.user;
        const updateUserInfosUseCase = tsyringe_1.container.resolve(UpdateUserInfosUseCase_1.UpdateUserInfosUseCase);
        const updatedUser = await updateUserInfosUseCase.execute({
            name,
            email,
            isAdmin,
            userId,
        });
        return res.status(201).json({
            success: true,
            message: 'Informações do usuário atualizadas com sucesso',
            user: updatedUser,
        });
    }
}
exports.UpdateUserInfosController = UpdateUserInfosController;
