"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormCarsImagesRepository = void 0;
const typeorm_1 = require("typeorm");
const CarImage_1 = require("../entities/CarImage");
class TypeormCarsImagesRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(CarImage_1.CarImage);
    }
    async create({ carId, imageName, path }) {
        const newCarImage = this.repository.create({ carId, imageName, path });
        return await this.repository.save(newCarImage);
    }
    async delete(imageId) {
        await this.repository.delete(imageId);
    }
    async findById(imageId) {
        return await this.repository.findOneBy({ _id: imageId });
    }
}
exports.TypeormCarsImagesRepository = TypeormCarsImagesRepository;
