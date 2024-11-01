"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRentalsRepository = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const Rental_1 = require("../../infra/typeorm/entities/Rental");
class MockRentalsRepository {
    constructor() {
        this.rentals = [];
    }
    async listAll({ userId, carId, filterStartDate, filterEndDate, }) {
        const rentals = this.rentals
            .filter((rental) => (userId ? rental.user.toString() === userId : rental))
            .filter((rental) => (carId ? rental.car.toString() === carId : rental))
            .filter((rental) => (0, dayjs_1.default)(rental.startDate).isAfter(filterStartDate) &&
            (0, dayjs_1.default)(rental.startDate).isBefore(filterEndDate));
        return rentals;
    }
    async update(data) {
        const retanlIndex = this.rentals.findIndex((rental) => rental._id.toString() === data._id);
        this.rentals[retanlIndex] = {
            ...this.rentals[retanlIndex],
            ...data,
        };
    }
    async create({ userId, carId, expectedReturnDate, }) {
        const newRental = new Rental_1.Rental({
            carId,
            expectedReturnDate,
            userId,
        });
        this.rentals.push(newRental);
        return newRental;
    }
    async findOpenRentalByCar(carId) {
        return this.rentals.find((rental) => rental.car.toString() === carId && !rental.endDate);
    }
    async findOpenRentalByUser(userId) {
        return this.rentals.find((rental) => rental.user.toString() === userId && !rental.endDate);
    }
    async list(userId) {
        if (userId) {
            return this.rentals.filter((rental) => rental.user.toString() === userId);
        }
        return this.rentals;
    }
    async findById(rentalId) {
        return this.rentals.find((rental) => rental._id.toString() === rentalId);
    }
}
exports.MockRentalsRepository = MockRentalsRepository;
