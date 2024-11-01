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
exports.UpdateDefaultCarImageUseCase = void 0;
const AppError_1 = require("../../../../../shared/errors/AppError");
const tsyringe_1 = require("tsyringe");
let UpdateDefaultCarImageUseCase = class UpdateDefaultCarImageUseCase {
    constructor(carsImagesRepository, carsRepository, storageProvider) {
        this.carsImagesRepository = carsImagesRepository;
        this.carsRepository = carsRepository;
        this.storageProvider = storageProvider;
    }
    async execute({ carId, defaultImage }) {
        if (!defaultImage)
            throw new AppError_1.AppError('Imagem não enviada');
        if (!carId)
            throw new AppError_1.AppError('_id do carro não informado');
        const car = await this.carsRepository.findById(carId);
        if (!car)
            throw new AppError_1.AppError('Carro não encontrado ');
        if (car.defaultImage) {
            await this.storageProvider.deleteImage(car.defaultImage.imageName, 'cars');
        }
        const path = await this.storageProvider.uploadImage(defaultImage, 'cars');
        const carImage = await this.carsImagesRepository.create({
            carId,
            imageName: defaultImage,
            path,
        });
        await this.carsRepository.updateOne(carId, {
            defaultImage: carImage._id.toString(),
        });
    }
};
UpdateDefaultCarImageUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('CarsImagesRepository')),
    __param(1, (0, tsyringe_1.inject)('CarsRepository')),
    __param(2, (0, tsyringe_1.inject)('StorageProvider')),
    __metadata("design:paramtypes", [Object, Object, Object])
], UpdateDefaultCarImageUseCase);
exports.UpdateDefaultCarImageUseCase = UpdateDefaultCarImageUseCase;
