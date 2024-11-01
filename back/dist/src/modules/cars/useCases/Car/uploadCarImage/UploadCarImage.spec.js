"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MockStorageProvider_1 = require("../../../../../shared/container/providers/StorageProvider/MockStorageProvider");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockCarsRepository_1 = require("../../../repositories/Cars/MockCarsRepository");
const MockCarsImagesRepository_1 = require("../../../repositories/CarsImages/MockCarsImagesRepository");
const UploadCarImageUseCase_1 = require("./UploadCarImageUseCase");
let mockCarsImagesRepository;
let mockCarsRepository;
let storageProvider;
let uploadCarImageUseCase;
describe('Upload car iamge', () => {
    beforeEach(() => {
        mockCarsImagesRepository = new MockCarsImagesRepository_1.MockCarsImagesRepository();
        mockCarsRepository = new MockCarsRepository_1.MockCarsRepository();
        storageProvider = new MockStorageProvider_1.MockStorageProvider();
        uploadCarImageUseCase = new UploadCarImageUseCase_1.UploadCarImageUseCase(mockCarsImagesRepository, mockCarsRepository, storageProvider);
    });
    it('should not be able upload car image if carIf not sent', async () => {
        await expect(uploadCarImageUseCase.execute({
            carId: null,
            image: 'image_test',
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able upload car image if image not sent', async () => {
        await expect(uploadCarImageUseCase.execute({
            carId: new mongoose_1.Types.ObjectId().toString(),
            image: null,
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able update user avatar', async () => {
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
        await uploadCarImageUseCase.execute({
            carId: car._id.toString(),
            image: 'image_test',
        });
        const updatedCar = await mockCarsRepository.findById(car._id.toString());
        expect(updatedCar.images.length).toBeGreaterThan(0);
    });
});
