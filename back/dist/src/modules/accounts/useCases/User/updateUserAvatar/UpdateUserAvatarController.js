"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserAvatarController = void 0;
const UpdateUserAvatarUseCase_1 = require("./UpdateUserAvatarUseCase");
const tsyringe_1 = require("tsyringe");
class UpdateUserAvatarController {
    async handle(req, res) {
        const avatarImage = req.file.filename;
        const updateUserAvatarUseCase = tsyringe_1.container.resolve(UpdateUserAvatarUseCase_1.UpdateUserAvatarUseCase);
        const updatedUser = await updateUserAvatarUseCase.execute({
            userId: req.user._id,
            avatarImage,
        });
        return res.status(200).json({
            success: true,
            message: 'Avatar atualizado com sucesso',
            user: updatedUser,
        });
    }
}
exports.UpdateUserAvatarController = UpdateUserAvatarController;
