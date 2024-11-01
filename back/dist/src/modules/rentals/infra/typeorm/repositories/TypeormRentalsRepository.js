"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormRentalsRepository = void 0;
const typeorm_1 = require("typeorm");
const Rental_1 = require("../entities/Rental");
class TypeormRentalsRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Rental_1.Rental);
    }
    async findOpenRentalByCar(carId) {
        return await this.repository.findOneBy({
            carId,
            endDate: null,
        });
    }
    async findOpenRentalByUser(userId) {
        return await this.repository.findOneBy({
            userId,
            endDate: null,
        });
    }
    async findById(rentalId) {
        return await this.repository.findOneBy({ _id: rentalId });
    }
    async create({ carId, expectedReturnDate, userId, }) {
        const newRental = this.repository.create({
            carId,
            expectedReturnDate,
            userId,
        });
        return await this.repository.save(newRental);
    }
    async list(userId) {
        return await this.repository.findBy({ userId });
    }
    async listAll({ carId, filterEndDate, filterStartDate, userId, }) {
        return await this.repository.findBy({
            carId,
            endDate: new Date(filterEndDate),
            startDate: new Date(filterStartDate),
            userId,
        });
    }
    async update(data) {
        await this.repository.save(data);
    }
}
exports.TypeormRentalsRepository = TypeormRentalsRepository;
