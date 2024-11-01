"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../../../errors/AppError");
const auth_1 = __importDefault(require("../../../../config/auth"));
const TypeormUsersRepository_1 = require("../../../../modules/accounts/infra/typeorm/repositories/TypeormUsersRepository");
async function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        throw new AppError_1.AppError('Token não enviado', 401);
    const [, token] = authHeader.split(' ');
    try {
        const { secretToken } = auth_1.default;
        const { sub: userId } = (0, jsonwebtoken_1.verify)(token, secretToken);
        const usersRepository = new TypeormUsersRepository_1.TypeormUsersRepository();
        const user = await usersRepository.findById(userId.toString());
        if (!user)
            throw new AppError_1.AppError('Usuário inválido', 401);
        req.user = {
            _id: userId.toString(),
        };
        next();
    }
    catch (err) {
        console.log('ERROR', err.message);
        throw new AppError_1.AppError('Token inválido', 401);
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
