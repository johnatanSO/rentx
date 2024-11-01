"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MockStorageProvider_1 = require("../../../../../shared/container/providers/StorageProvider/MockStorageProvider");
const MockCarsImagesRepository_1 = require("../../../repositories/CarsImages/MockCarsImagesRepository");
const MockCarsRepository_1 = require("./../../../repositories/Cars/MockCarsRepository");
const RemoveCarImageUseCase_1 = require("./RemoveCarImageUseCase");
const AppError_1 = require("../../../../../shared/errors/AppError");
let mockCarsRepository;
let mockCarsImagesRepository;
let storageProvider;
let removeCarImageUseCase;
describe('Remove car image', () => {
    beforeEach(() => {
        mockCarsRepository = new MockCarsRepository_1.MockCarsRepository();
        mockCarsImagesRepository = new MockCarsImagesRepository_1.MockCarsImagesRepository();
        storageProvider = new MockStorageProvider_1.MockStorageProvider();
        removeCarImageUseCase = new RemoveCarImageUseCase_1.RemoveCarImageUseCase(mockCarsRepository, mockCarsImagesRepository, storageProvider);
    });
    it('should not be able remove car image if imageId not sent', async () => {
        await expect(async () => {
            await removeCarImageUseCase.execute({
                carId: new mongoose_1.Types.ObjectId().toString(),
                imageId: null,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able remove car image if carId not sent', async () => {
        await expect(async () => {
            await removeCarImageUseCase.execute({
                carId: null,
                imageId: new mongoose_1.Types.ObjectId().toString(),
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able remove car image if imageId inválid', async () => {
        await expect(async () => {
            await removeCarImageUseCase.execute({
                carId: new mongoose_1.Types.ObjectId().toString(),
                imageId: new mongoose_1.Types.ObjectId().toString(),
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able remove car image', async () => {
        const car = await mockCarsRepository.create({
            brand: 'teste',
            categoryId: new mongoose_1.Types.ObjectId().toString(),
            dailyRate: 100,
            description: 'teste',
            fineAmount: 100,
            licensePlate: 'teste',
            name: 'teste',
            transmission: 'teste',
        });
        const carImage = await mockCarsImagesRepository.create({
            carId: car._id.toString(),
            imageName: 'teste',
            path: '/fake/teste',
        });
        await mockCarsRepository.addImage(car._id.toString(), carImage._id.toString());
        await removeCarImageUseCase.execute({
            carId: car._id.toString(),
            imageId: carImage._id.toString(),
        });
        const deletedImage = await mockCarsImagesRepository.findById(carImage._id.toString());
        const updatedCar = await mockCarsRepository.findById(car._id.toString());
        expect(updatedCar.images).not.toContain(carImage._id.toString());
        expect(deletedImage).toBeUndefined();
    });
});
