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
exports.SendForgotPasswordMailUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../../shared/errors/AppError");
const uuid_1 = require("uuid");
const path_1 = require("path");
let SendForgotPasswordMailUseCase = class SendForgotPasswordMailUseCase {
    constructor(usersRepository, usersTokensRepository, dateProvider, mailProvider) {
        this.usersRepository = usersRepository;
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
        this.mailProvider = mailProvider;
    }
    async execute(email) {
        if (!email)
            throw new AppError_1.AppError('E-mail não informado');
        const user = await this.usersRepository.findByEmail(email);
        if (!user)
            throw new AppError_1.AppError('Usuário não encontrado');
        const templatePath = (0, path_1.resolve)(__dirname, '..', '..', '..', 'views', 'emails', 'forgotPassword.hbs');
        const token = (0, uuid_1.v4)();
        const expiresDate = this.dateProvider.addHours(3);
        await this.usersTokensRepository.create({
            refreshToken: token,
            user: user._id.toString(),
            expiresDate,
        });
        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_PASSWORD}${token}`,
        };
        await this.mailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath);
    }
};
SendForgotPasswordMailUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __param(1, (0, tsyringe_1.inject)('UsersTokensRepository')),
    __param(2, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __param(3, (0, tsyringe_1.inject)('MailProvider')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SendForgotPasswordMailUseCase);
exports.SendForgotPasswordMailUseCase = SendForgotPasswordMailUseCase;
