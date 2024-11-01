"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormCarsRepository = void 0;
const typeorm_1 = require("typeorm");
const Car_1 = require("../entities/Car");
class TypeormCarsRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Car_1.Car);
    }
    async create({ brand, categoryId, dailyRate, description, fineAmount, licensePlate, name, transmission, }) {
        const newCar = this.repository.create({
            brand,
            categoryId,
            dailyRate,
            description,
            fineAmount,
            licensePlate,
            name,
            transmission,
        });
        return await this.repository.save(newCar);
    }
    async findByLicensePlate(licensePlate) {
        return await this.repository.findOneBy({ licensePlate });
    }
    async listAvaliable(categoryId, brand, name) {
        return await this.repository.findBy({ categoryId, brand, name });
    }
    async findById(carId) {
        return await this.repository.findOneBy({ _id: carId });
    }
    async update(data) {
        await this.repository.save(data);
    }
    async addImage(_id, imageId) {
        throw new Error('add image');
    }
    async listAll() {
        return await this.repository.find();
    }
    async removeImage(carId, imageId) {
        throw new Error('removeImage');
    }
    async delete(carId) {
        await this.repository.delete(carId);
    }
}
exports.TypeormCarsRepository = TypeormCarsRepository;
