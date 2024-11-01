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
exports.FinalizeRentalUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let FinalizeRentalUseCase = class FinalizeRentalUseCase {
    constructor(rentalsRepository, carsRepository, usersRepository, dateProvider) {
        this.rentalsRepository = rentalsRepository;
        this.carsRepository = carsRepository;
        this.usersRepository = usersRepository;
        this.dateProvider = dateProvider;
    }
    async execute({ rentalId, userId }) {
        if (!rentalId)
            throw new AppError_1.AppError('_id do aluguel não foi enviado');
        const rental = await this.rentalsRepository.findById(rentalId);
        if (!rental)
            throw new AppError_1.AppError('Aluguel não encontrado');
        const user = await this.usersRepository.findById(userId);
        if (!user.isAdmin && rental.user.toString() !== userId) {
            throw new AppError_1.AppError('O aluguel não pertence à este usuário');
        }
        if (rental.endDate)
            throw new AppError_1.AppError('Aluguel já foi finalizado');
        const car = await this.carsRepository.findById(rental.car.toString());
        const dateNow = this.dateProvider.dateNow();
        const rentalDuration = this.dateProvider.compareInDays(rental.startDate, dateNow);
        const extraDays = this.dateProvider.compareInDays(rental.expectedReturnDate, dateNow);
        let rentalTotalValue = rentalDuration > 0 ? car.dailyRate * rentalDuration : car.dailyRate;
        if (extraDays > 0) {
            const fineTotal = extraDays * car.fineAmount;
            rentalTotalValue = fineTotal + rentalTotalValue;
        }
        await this.carsRepository.updateOne(car._id.toString(), {
            avaliable: true,
        });
        await this.rentalsRepository.finalizeRental(rentalId, rentalTotalValue);
    }
};
FinalizeRentalUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('RentalsRepository')),
    __param(1, (0, tsyringe_1.inject)('CarsRepository')),
    __param(2, (0, tsyringe_1.inject)('UsersRepository')),
    __param(3, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], FinalizeRentalUseCase);
exports.FinalizeRentalUseCase = FinalizeRentalUseCase;
