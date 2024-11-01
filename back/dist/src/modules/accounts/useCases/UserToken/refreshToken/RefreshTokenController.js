"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
const tsyringe_1 = require("tsyringe");
const RefreshTokenUseCase_1 = require("./RefreshTokenUseCase");
class RefreshTokenController {
    async handle(req, res) {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const refreshTokenUseCase = tsyringe_1.container.resolve(RefreshTokenUseCase_1.RefreshTokenUseCase);
        const { refreshToken, newToken } = await refreshTokenUseCase.execute(token);
        return res.status(200).json({
            success: true,
            token: newToken,
            refreshToken,
        });
    }
}
exports.RefreshTokenController = RefreshTokenController;
