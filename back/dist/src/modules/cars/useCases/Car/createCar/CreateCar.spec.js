"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("./../../../../../shared/errors/AppError");
const MockCarsRepository_1 = require("./../../../repositories/Cars/MockCarsRepository");
require("reflect-metadata");
const mongoose_1 = require("mongoose");
const CreateCarUseCase_1 = require("./CreateCarUseCase");
const MockCarsImagesRepository_1 = require("../../../repositories/CarsImages/MockCarsImagesRepository");
const MockStorageProvider_1 = require("../../../../../shared/container/providers/StorageProvider/MockStorageProvider");
let mockCarsRepository;
let mockCarsImagesRepository;
let storageProvider;
let createCarUseCase;
describe('Create car', () => {
    beforeEach(() => {
        mockCarsRepository = new MockCarsRepository_1.MockCarsRepository();
        mockCarsImagesRepository = new MockCarsImagesRepository_1.MockCarsImagesRepository();
        storageProvider = new MockStorageProvider_1.MockStorageProvider();
        createCarUseCase = new CreateCarUseCase_1.CreateCarUseCase(mockCarsRepository, mockCarsImagesRepository, storageProvider);
    });
    it('Should be able create a new car', async () => {
        const newCar = await createCarUseCase.execute({
            name: 'Name car',
            description: 'Description car',
            dailyRate: 100,
            licensePlate: 'ABC-1234',
            fineAmount: 60,
            brand: 'Brand',
            categoryId: new mongoose_1.Types.ObjectId().toString(),
            transmission: 'auto',
            defaultImage: null,
        });
        expect(newCar).toHaveProperty('_id');
    });
    it('Should not be able create a new car if already exists license plate', async () => {
        await expect(async () => {
            await createCarUseCase.execute({
                name: 'Name car 1',
                description: 'Description car 1',
                dailyRate: 100,
                licensePlate: 'ABC-1234',
                fineAmount: 60,
                brand: 'Brand',
                categoryId: new mongoose_1.Types.ObjectId().toString(),
                transmission: 'auto',
                defaultImage: null,
            });
            await createCarUseCase.execute({
                name: 'Name car 2',
                description: 'Description car 2',
                dailyRate: 100,
                licensePlate: 'ABC-1234',
                fineAmount: 60,
                brand: 'Brand',
                categoryId: new mongoose_1.Types.ObjectId().toString(),
                transmission: 'auto',
                defaultImage: null,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able create a new car with avaliable true by default', async () => {
        const newCar = await createCarUseCase.execute({
            name: 'Name car 1',
            description: 'Description car 1',
            dailyRate: 100,
            licensePlate: 'ABC-1234',
            fineAmount: 60,
            brand: 'Brand',
            categoryId: new mongoose_1.Types.ObjectId().toString(),
            transmission: 'auto',
            defaultImage: null,
        });
        expect(newCar.avaliable).toEqual(true);
    });
    it('should not be able create an new car ir license plate not sent', async () => {
        await expect(async () => {
            await createCarUseCase.execute({
                name: 'Name car 1',
                description: 'Description car 1',
                dailyRate: 100,
                licensePlate: null,
                fineAmount: 60,
                brand: 'Brand',
                categoryId: new mongoose_1.Types.ObjectId().toString(),
                transmission: 'auto',
                defaultImage: null,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able create car with default image', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name car 1',
            description: 'Description car 1',
            dailyRate: 100,
            licensePlate: 'ABC-123',
            fineAmount: 60,
            brand: 'Brand',
            categoryId: new mongoose_1.Types.ObjectId().toString(),
            transmission: 'auto',
            defaultImage: 'testeImage',
        });
        expect(car.defaultImage).not.toEqual(null);
    });
});
