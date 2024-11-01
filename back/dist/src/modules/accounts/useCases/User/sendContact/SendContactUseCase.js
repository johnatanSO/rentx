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
exports.SendContactUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../../shared/errors/AppError");
const path_1 = require("path");
let SendContactUseCase = class SendContactUseCase {
    constructor(usersRepository, mailProvider) {
        this.usersRepository = usersRepository;
        this.mailProvider = mailProvider;
    }
    async execute({ name, email, message }) {
        if (!email)
            throw new AppError_1.AppError('E-mail não informado');
        if (!message)
            throw new AppError_1.AppError('Mensagem não informada');
        const templatePath = (0, path_1.resolve)(__dirname, '..', '..', '..', 'views', 'emails', 'contact.hbs');
        const variables = {
            name,
            email,
            message,
        };
        await this.mailProvider.sendMail('devsantosjohn@gmail.com', 'Contato RentX', variables, templatePath);
        await this.mailProvider.sendMail(email, 'Contato RentX', variables, templatePath);
    }
};
SendContactUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __param(1, (0, tsyringe_1.inject)('MailProvider')),
    __metadata("design:paramtypes", [Object, Object])
], SendContactUseCase);
exports.SendContactUseCase = SendContactUseCase;
