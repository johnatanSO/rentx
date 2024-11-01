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
exports.AuthenticateUserUseCase = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../../shared/errors/AppError");
const auth_1 = __importDefault(require("../../../../../config/auth"));
let AuthenticateUserUseCase = class AuthenticateUserUseCase {
    constructor(usersRepository, usersTokensRepository, dateProvider) {
        this.dateProvider = dateProvider;
        this.usersRepository = usersRepository;
        this.usersTokensRepository = usersTokensRepository;
    }
    async execute({ email, password }) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user)
            throw new AppError_1.AppError('E-mail ou senha incorretos');
        const passwordMatch = await (0, bcrypt_1.compare)(password, user.password);
        if (!passwordMatch)
            throw new AppError_1.AppError('E-mail ou senha incorretos');
        const { secretToken, secretRefreshToken, expiresInToken, expiresInRefreshToken, expiresRefreshTokenDays, } = auth_1.default;
        const token = (0, jsonwebtoken_1.sign)({}, secretToken, {
            subject: user._id.toString(),
            expiresIn: expiresInToken,
        });
        const refreshToken = (0, jsonwebtoken_1.sign)({ email }, secretRefreshToken, {
            subject: user._id.toString(),
            expiresIn: expiresInRefreshToken,
        });
        const refreshTokenExpiresDate = this.dateProvider.addDays(expiresRefreshTokenDays);
        await this.usersTokensRepository.create({
            user: user._id.toString(),
            refreshToken,
            expiresDate: refreshTokenExpiresDate,
        });
        return {
            token,
            refreshToken,
            user: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                avatar: user.avatar,
                favoriteCars: user.favoriteCars,
                avatarURL: user.avatarURL,
            },
        };
    }
};
AuthenticateUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __param(1, (0, tsyringe_1.inject)('UsersTokensRepository')),
    __param(2, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthenticateUserUseCase);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
