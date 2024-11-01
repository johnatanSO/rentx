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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const tsyringe_1 = require("tsyringe");
const auth_1 = __importDefault(require("../../../../../config/auth"));
const AppError_1 = require("../../../../../shared/errors/AppError");
const UserToken_1 = require("../../../infra/typeorm/entities/UserToken");
let RefreshTokenUseCase = class RefreshTokenUseCase {
    constructor(usersTokensRepository, dateProvider) {
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
    }
    async execute(token) {
        if (!token)
            throw new AppError_1.AppError('Refresh token não enviado');
        const { sub: userId, email } = (0, jsonwebtoken_1.verify)(token, auth_1.default.secretRefreshToken);
        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(userId, token);
        if (!userToken)
            throw new AppError_1.AppError('Refresh token não encontrado');
        await this.usersTokensRepository.deleteById(userToken._id.toString());
        const refreshToken = (0, jsonwebtoken_1.sign)({ email }, auth_1.default.secretRefreshToken, {
            subject: userId,
            expiresIn: auth_1.default.expiresInRefreshToken,
        });
        const expiresDate = this.dateProvider.addDays(auth_1.default.expiresRefreshTokenDays);
        const newUserToken = new UserToken_1.UserToken({
            user: userId,
            refreshToken,
            expiresDate,
        });
        await this.usersTokensRepository.save(newUserToken);
        const newToken = (0, jsonwebtoken_1.sign)({}, auth_1.default.secretToken, {
            subject: userId,
            expiresIn: auth_1.default.expiresInToken,
        });
        return { refreshToken, newToken };
    }
};
RefreshTokenUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersTokensRepository')),
    __param(1, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __metadata("design:paramtypes", [Object, Object])
], RefreshTokenUseCase);
exports.RefreshTokenUseCase = RefreshTokenUseCase;
