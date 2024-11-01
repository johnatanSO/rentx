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
exports.UpdateUserAvatarUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../../shared/errors/AppError");
let UpdateUserAvatarUseCase = class UpdateUserAvatarUseCase {
    constructor(usersRepository, storageProvider) {
        this.usersRepository = usersRepository;
        this.storageProvider = storageProvider;
    }
    async execute({ userId, avatarImage }) {
        if (!avatarImage)
            throw new AppError_1.AppError('Imagem não enviada');
        if (!userId)
            throw new AppError_1.AppError('_id do usuário não enviado');
        const user = await this.usersRepository.findById(userId);
        if (!user)
            throw new AppError_1.AppError('Usuário inválido');
        if (user.avatar) {
            await this.storageProvider.deleteImage(user.avatar, 'avatar');
        }
        const path = await this.storageProvider.uploadImage(avatarImage, 'avatar');
        const filters = {
            _id: userId,
        };
        const updateFields = {
            $set: {
                avatar: avatarImage,
                avatarURL: path,
            },
        };
        await this.usersRepository.update(filters, updateFields);
        return await this.usersRepository.findById(userId);
    }
};
UpdateUserAvatarUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __param(1, (0, tsyringe_1.inject)('StorageProvider')),
    __metadata("design:paramtypes", [Object, Object])
], UpdateUserAvatarUseCase);
exports.UpdateUserAvatarUseCase = UpdateUserAvatarUseCase;
