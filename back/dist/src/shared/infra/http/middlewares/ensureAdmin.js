"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAdmin = void 0;
const AppError_1 = require("../../../errors/AppError");
const TypeormUsersRepository_1 = require("../../../../modules/accounts/infra/typeorm/repositories/TypeormUsersRepository");
async function ensureAdmin(req, res, next) {
    const { _id: idUser } = req.user;
    const usersRepository = new TypeormUsersRepository_1.TypeormUsersRepository();
    const user = await usersRepository.findById(idUser);
    if (!user.isAdmin)
        throw new AppError_1.AppError('Usuário não tem permissão de administrador');
    return next();
}
exports.ensureAdmin = ensureAdmin;
