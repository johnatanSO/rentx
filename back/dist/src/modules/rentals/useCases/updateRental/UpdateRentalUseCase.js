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
exports.UpdateRentalUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let UpdateRentalUseCase = class UpdateRentalUseCase {
    constructor(rentalsRepository, dateProvider) {
        this.rentalsRepository = rentalsRepository;
        this.dateProvider = dateProvider;
    }
    async execute({ rentalId, car, user, startDate, expectedReturnDate, }) {
        if (!rentalId)
            throw new AppError_1.AppError('_id do aluguel não foi enviado');
        const rental = await this.rentalsRepository.findById(rentalId);
        if (!rental)
            throw new AppError_1.AppError('_id do aluguel inválido');
        if (rental.endDate) {
            throw new AppError_1.AppError('Não é possível editar este aluguel por que ele já foi finalizado');
        }
        const minimumHour = 24;
        if (rental.car.toString() !== car) {
            const carUnavaliable = await this.rentalsRepository.findOpenRentalByCar(car);
            if (carUnavaliable) {
                throw new AppError_1.AppError('Já existe um aluguel com este carro');
            }
        }
        if (rental.user.toString() !== user) {
            const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user);
            if (rentalOpenToUser) {
                throw new AppError_1.AppError('Usuário já possui um aluguel em andamento');
            }
        }
        const expectedReturnDateEndDay = this.dateProvider.endDay(expectedReturnDate);
        const compare = this.dateProvider.compareInHours(startDate, expectedReturnDateEndDay);
        if (compare < minimumHour) {
            throw new AppError_1.AppError('Duração do aluguel deve ter no mínimo 24 horas');
        }
        rental.carId = car;
        rental.userId = user;
        rental.startDate = this.dateProvider.convertToUTC(startDate);
        rental.expectedReturnDate = expectedReturnDateEndDay;
        this.rentalsRepository.update(rental);
    }
};
UpdateRentalUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('RentalsRepository')),
    __param(1, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __metadata("design:paramtypes", [Object, Object])
], UpdateRentalUseCase);
exports.UpdateRentalUseCase = UpdateRentalUseCase;
