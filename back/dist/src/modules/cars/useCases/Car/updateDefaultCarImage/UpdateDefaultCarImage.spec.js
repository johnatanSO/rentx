"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MockStorageProvider_1 = require("../../../../../shared/container/providers/StorageProvider/MockStorageProvider");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockCarsRepository_1 = require("../../../repositories/Cars/MockCarsRepository");
const MockCarsImagesRepository_1 = require("../../../repositories/CarsImages/MockCarsImagesRepository");
const UpdateDefaultCarImageUseCase_1 = require("./UpdateDefaultCarImageUseCase");
let mockCarsImagesRepository;
let mockCarsRepository;
let storageProvider;
let updateDefaultCarImageUseCase;
describe('Update default car image', () => {
    beforeEach(() => {
        mockCarsImagesRepository = new MockCarsImagesRepository_1.MockCarsImagesRepository();
        mockCarsRepository = new MockCarsRepository_1.MockCarsRepository();
        storageProvider = new MockStorageProvider_1.MockStorageProvider();
        updateDefaultCarImageUseCase = new UpdateDefaultCarImageUseCase_1.UpdateDefaultCarImageUseCase(mockCarsImagesRepository, mockCarsRepository, storageProvider);
    });
    it('should not be able update default car image if carId not sent', async () => {
        await expect(updateDefaultCarImageUseCase.execute({
            carId: null,
            defaultImage: 'image_test',
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able update default car image if image not sent', async () => {
        await expect(updateDefaultCarImageUseCase.execute({
            carId: new mongoose_1.Types.ObjectId().toString(),
            defaultImage: null,
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able update default car image if carId invalid', async () => {
        await expect(updateDefaultCarImageUseCase.execute({
            carId: new mongoose_1.Types.ObjectId().toString(),
            defaultImage: 'image_test',
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able delete image if car already default image', async () => {
        const car = await mockCarsRepository.create({
            name: 'Name car',
            description: 'Description car',
            dailyRate: 100,
            licensePlate: 'ABC-1234',
            fineAmount: 60,
            brand: 'Brand',
            categoryId: new mongoose_1.Types.ObjectId().toString(),
            transmission: 'auto',
        });
        const carImage = await mockCarsImagesRepository.create({
            carId: car._id.toString(),
            imageName: 'test image',
            path: '/fake/test_image.jpeg',
        });
        await mockCarsRepository.updateOne(car._id.toString(), {
            defaultImage: carImage._id.toString(),
        });
        await updateDefaultCarImageUseCase.execute({
            carId: car._id.toString(),
            defaultImage: 'image_test',
        });
    });
    it('should be able update default image', async () => {
        const car = await mockCarsRepository.create({
            name: 'Name car',
            description: 'Description car',
            dailyRate: 100,
            licensePlate: 'ABC-1234',
            fineAmount: 60,
            brand: 'Brand',
            categoryId: new mongoose_1.Types.ObjectId().toString(),
            transmission: 'auto',
        });
        await updateDefaultCarImageUseCase.execute({
            carId: car._id.toString(),
            defaultImage: 'image_test',
        });
    });
});
