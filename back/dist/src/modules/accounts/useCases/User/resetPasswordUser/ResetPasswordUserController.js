"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordUserController = void 0;
const tsyringe_1 = require("tsyringe");
const ResetPasswordUserUseCase_1 = require("./ResetPasswordUserUseCase");
class ResetPasswordUserController {
    async handle(req, res) {
        const { password } = req.body;
        const { refreshToken } = req.query;
        const resetUserUseCase = tsyringe_1.container.resolve(ResetPasswordUserUseCase_1.ResetPasswordUserUseCase);
        await resetUserUseCase.execute({
            refreshToken: String(refreshToken),
            password,
        });
        return res.status(200).json({
            success: true,
        });
    }
}
exports.ResetPasswordUserController = ResetPasswordUserController;
