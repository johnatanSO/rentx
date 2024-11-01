"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCarsRepository = void 0;
const Car_1 = require("../../infra/typeorm/entities/Car");
class MockCarsRepository {
    constructor() {
        this.cars = [];
    }
    async update(data) {
        const index = this.cars.findIndex((user) => user._id.toString() === data._id.toString());
        if (index !== -1) {
            this.cars[index] = {
                ...this.cars[index],
                ...data,
            };
        }
    }
    async create({ name, description, dailyRate, licensePlate, fineAmount, brand, categoryId, transmission, }) {
        const newCar = new Car_1.Car({
            name,
            description,
            dailyRate,
            licensePlate,
            fineAmount,
            brand,
            categoryId,
            transmission,
        });
        this.cars.push(newCar);
        return newCar;
    }
    async findByLicensePlate(licensePlate) {
        return this.cars.find((car) => car.licensePlate === licensePlate);
    }
    async listAvaliable(categoryId, brand, name) {
        return this.cars.filter((car) => {
            if (car.avaliable ||
                (brand && car.brand === brand) ||
                (categoryId && car.category.toString() === categoryId.toString()) ||
                (name && car.name === name)) {
                return car;
            }
            return null;
        });
    }
    async listAll() {
        return this.cars;
    }
    async findById(carId) {
        return this.cars.find((car) => car._id.toString() === carId);
    }
    async addImage(_id, imageId) {
        const index = this.cars.findIndex((car) => car._id.toString() === _id);
        if (index !== -1) {
            this.cars[index] = {
                ...this.cars[index],
                images: [...this.cars[index].images, imageId],
            };
        }
    }
    async removeImage(carId, imageId) {
        const carIndex = this.cars.findIndex((car) => car._id.toString() === carId);
        const newImages = this.cars[carIndex].images.filter((image) => image !== imageId);
        this.cars[carIndex] = {
            ...this.cars[carIndex],
            images: newImages,
        };
    }
    async delete(carId) {
        this.cars = this.cars.filter((car) => car._id.toString() !== carId);
    }
}
exports.MockCarsRepository = MockCarsRepository;
