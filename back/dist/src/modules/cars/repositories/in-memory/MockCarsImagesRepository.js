"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCarsImagesRepository = void 0;
const CarImage_1 = require("../../infra/typeorm/entities/CarImage");
class MockCarsImagesRepository {
    constructor() {
        this.carsImages = [];
    }
    async create({ carId, imageName, path }) {
        const newCarImage = new CarImage_1.CarImage({
            carId,
            imageName,
            path,
        });
        this.carsImages.push(newCarImage);
        return newCarImage;
    }
    async delete(imageId) {
        this.carsImages = this.carsImages.filter((carImage) => carImage._id.toString() !== imageId);
    }
    async findById(imageId) {
        return this.carsImages.find((carImage) => carImage._id.toString() === imageId);
    }
}
exports.MockCarsImagesRepository = MockCarsImagesRepository;
