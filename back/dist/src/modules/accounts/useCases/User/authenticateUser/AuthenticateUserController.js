"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
const tsyringe_1 = require("tsyringe");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
class AuthenticateUserController {
    async handle(req, res) {
        const { email, password } = req.body;
        const authenticateUserUseCate = tsyringe_1.container.resolve(AuthenticateUserUseCase_1.AuthenticateUserUseCase);
        const authenticatedUser = await authenticateUserUseCate.execute({
            email,
            password,
        });
        return res.status(200).json({
            success: true,
            title: 'Usuário autenticado com sucesso',
            user: authenticatedUser.user,
            token: authenticatedUser.token,
            refreshToken: authenticatedUser.refreshToken,
        });
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
