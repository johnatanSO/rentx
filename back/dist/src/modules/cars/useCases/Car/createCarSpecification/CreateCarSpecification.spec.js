"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockSpecificationsRepository_1 = require("./../../../repositories/Specifitacions/MockSpecificationsRepository");
const mongoose_1 = require("mongoose");
const AppError_1 = require("./../../../../../shared/errors/AppError");
const MockCarsRepository_1 = require("./../../../repositories/Cars/MockCarsRepository");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
let mockCarsRepository;
let mockSpecificationsRepository;
let createCarSpecificationUseCase;
describe('Create car specification', () => {
    beforeEach(() => {
        mockCarsRepository = new MockCarsRepository_1.MockCarsRepository();
        mockSpecificationsRepository = new MockSpecificationsRepository_1.MockSpecificationsRepository();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase(mockCarsRepository, mockSpecificationsRepository);
    });
    it('should be able to add a new specification in car', async () => {
        const newCar = await mockCarsRepository.create({
            name: 'Name car 1',
            description: 'Description car 1',
            dailyRate: 100,
            licensePlate: 'ABC-1234',
            fineAmount: 60,
            brand: 'Brand',
            categoryId: new mongoose_1.Types.ObjectId().toString(),
            transmission: 'auto',
        });
        const newSpecification = await mockSpecificationsRepository.create({
            name: 'Teste',
            description: 'Teste',
        });
        const specificationsIds = [newSpecification._id.toString()];
        await createCarSpecificationUseCase.execute({
            carId: newCar._id.toString(),
            specificationsIds,
        });
        const updatedCar = await mockCarsRepository.findById(newCar._id.toString());
        expect(updatedCar).toHaveProperty('specifications');
        expect(updatedCar.specifications.length).toBe(1);
    });
    it('should not be able to add a new specification in car if car none-existent', async () => {
        await expect(async () => {
            const carId = '1234';
            const specificationsIds = ['54321'];
            await createCarSpecificationUseCase.execute({
                carId,
                specificationsIds,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able to add a new specification in car if carId not sent', async () => {
        await expect(async () => {
            const specificationsIds = ['54321'];
            await createCarSpecificationUseCase.execute({
                carId: null,
                specificationsIds,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able to add a new specification in car if specifications not sent', async () => {
        await expect(async () => {
            const carId = '1234';
            await createCarSpecificationUseCase.execute({
                carId,
                specificationsIds: null,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
