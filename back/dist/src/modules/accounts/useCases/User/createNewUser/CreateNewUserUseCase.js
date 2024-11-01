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
exports.CreateNewUserUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const bcrypt_1 = require("bcrypt");
const AppError_1 = require("../../../../../shared/errors/AppError");
let CreateNewUserUseCase = class CreateNewUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ name, email, password, confirmPassword, driverLicense, isAdmin, }) {
        if (!email)
            throw new AppError_1.AppError('E-mail não enviado');
        const alreadyExistUser = await this.usersRepository.findByEmail(email);
        if (alreadyExistUser) {
            throw new AppError_1.AppError('Já existe um usuário com este e-mail cadastrado');
        }
        if (confirmPassword !== password) {
            throw new AppError_1.AppError('As senhas não correspondem');
        }
        const hashPassword = await (0, bcrypt_1.hash)(password, 10);
        console.log('c');
        const newUser = await this.usersRepository.create({
            name,
            email,
            password: hashPassword,
            driverLicense,
            isAdmin,
        });
        return newUser;
    }
};
CreateNewUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __metadata("design:paramtypes", [Object])
], CreateNewUserUseCase);
exports.CreateNewUserUseCase = CreateNewUserUseCase;
