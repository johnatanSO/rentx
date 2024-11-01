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
exports.CreateRentalUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let CreateRentalUseCase = class CreateRentalUseCase {
    constructor(rentalsRepository, dateProvider, carsRepository) {
        this.rentalsRepository = rentalsRepository;
        this.dateProvider = dateProvider;
        this.carsRepository = carsRepository;
    }
    async execute({ userId, carId, expectedReturnDate, }) {
        const minimumHour = 24;
        const carUnavaliable = await this.rentalsRepository.findOpenRentalByCar(carId);
        if (carUnavaliable) {
            throw new AppError_1.AppError('Já existe um aluguel com este carro');
        }
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(userId);
        if (rentalOpenToUser) {
            throw new AppError_1.AppError('Usuário já possui um aluguel em andamento');
        }
        const dateNow = this.dateProvider.dateNow();
        const expectedReturnDateEndDay = this.dateProvider.endDay(expectedReturnDate);
        const compare = this.dateProvider.compareInHours(dateNow, expectedReturnDateEndDay);
        if (compare < minimumHour) {
            throw new AppError_1.AppError('Duração do aluguel deve ter no mínimo 24 horas');
        }
        const newRental = await this.rentalsRepository.create({
            userId,
            carId,
            expectedReturnDate: expectedReturnDateEndDay,
        });
        await this.carsRepository.updateOne(carId, {
            avaliable: false,
            reasonUnavaliable: 'Carro está alugado no momento',
        });
        return newRental;
    }
};
CreateRentalUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('RentalsRepository')),
    __param(1, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __param(2, (0, tsyringe_1.inject)('CarsRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateRentalUseCase);
exports.CreateRentalUseCase = CreateRentalUseCase;
