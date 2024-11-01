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
exports.CreateCarSpecificationUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../../shared/errors/AppError");
let CreateCarSpecificationUseCase = class CreateCarSpecificationUseCase {
    constructor(carsRepository, specificationsRepository) {
        this.carsRepository = carsRepository;
        this.specificationsRepository = specificationsRepository;
    }
    async execute({ carId, specificationsIds }) {
        if (!carId)
            throw new AppError_1.AppError('_id do carro não informado');
        if (!specificationsIds) {
            throw new AppError_1.AppError('Especificações não informadas');
        }
        const carExists = await this.carsRepository.findById(carId);
        if (!carExists)
            throw new AppError_1.AppError('Carro não existente');
        const specifications = await this.specificationsRepository.findByIds(specificationsIds);
        const newSpecificationsIds = specifications.map((specification) => specification._id);
        await this.carsRepository.updateOne(carId, {
            specifications: newSpecificationsIds,
        });
    }
};
CreateCarSpecificationUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('CarsRepository')),
    __param(1, (0, tsyringe_1.inject)('SpecificationsRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateCarSpecificationUseCase);
exports.CreateCarSpecificationUseCase = CreateCarSpecificationUseCase;
