"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordUserUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../../shared/errors/AppError");
const bcrypt_1 = require("bcrypt");
let ResetPasswordUserUseCase = class ResetPasswordUserUseCase {
    constructor(usersTokensRepository, usersRepository, dateProvider) {
        this.usersTokensRepository = usersTokensRepository;
        this.usersRepository = usersRepository;
        this.dateProvider = dateProvider;
    }
    async execute({ refreshToken, password }) {
        if (!refreshToken)
            throw new AppError_1.AppError('Token de recuperação de senha não enviado');
        const userToken = await this.usersTokensRepository.findByRefreshToken(refreshToken);
        if (!userToken)
            throw new AppError_1.AppError('Token de recuperação de senha inválido');
        const expired = this.dateProvider.compareBefore(userToken.expiresDate, this.dateProvider.dateNow());
        if (expired)
            throw new AppError_1.AppError('Token de recuperação de senha expirado');
        const userId = userToken.user._id;
        const encryptedPassword = await (0, bcrypt_1.hash)(password, 10);
        await this.usersRepository.update({ _id: userId }, { $set: { password: encryptedPassword } });
        await this.usersTokensRepository.deleteById(userToken._id.toString());
    }
};
ResetPasswordUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersTokensRepository')),
    __param(1, (0, tsyringe_1.inject)('UsersRepository')),
    __param(2, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __metadata("design:paramtypes", [Object, Object, Object])
], ResetPasswordUserUseCase);
exports.ResetPasswordUserUseCase = ResetPasswordUserUseCase;
