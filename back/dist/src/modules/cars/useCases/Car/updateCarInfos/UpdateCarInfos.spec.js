"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockCarsRepository_1 = require("../../../repositories/Cars/MockCarsRepository");
const mongoose_1 = require("mongoose");
const UpdateCarInfosUseCase_1 = require("./UpdateCarInfosUseCase");
const AppError_1 = require("../../../../../shared/errors/AppError");
let mockCarsRepository;
let updateCarInfosUseCase;
describe('Update car infos', () => {
    beforeEach(() => {
        mockCarsRepository = new MockCarsRepository_1.MockCarsRepository();
        updateCarInfosUseCase = new UpdateCarInfosUseCase_1.UpdateCarInfosUseCase(mockCarsRepository);
    });
    it('should not be able update car infos if carId no sent', async () => {
        await expect(async () => {
            const createdCar = await mockCarsRepository.create({
                name: 'teste',
                transmission: 'auto',
                licensePlate: 'ABC-1234',
                brand: 'Teste',
                categoryId: new mongoose_1.Types.ObjectId().toString(),
                dailyRate: 200,
                fineAmount: 400,
                description: 'Carro de testes',
            });
            delete createdCar._id;
            await updateCarInfosUseCase.execute({
                ...createdCar,
                categoryId: createdCar.category._id.toString(),
                carId: undefined,
                transmission: 'automatic',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able update car infos', async () => {
        const categoryId = new mongoose_1.Types.ObjectId();
        const car = await mockCarsRepository.create({
            name: 'Name car 1',
            description: 'Description car 1',
            dailyRate: 100,
            licensePlate: 'ABC-123',
            fineAmount: 60,
            brand: 'Brand',
            categoryId: categoryId.toString(),
            transmission: 'auto',
        });
        const newData = {
            ...car,
            name: 'new name',
            description: 'new description',
            categoryId,
        };
        await updateCarInfosUseCase.execute({
            ...newData,
            carId: car._id.toString(),
            categoryId: categoryId.toString(),
        });
        delete newData.categoryId;
        const updatedCar = await mockCarsRepository.findById(car._id.toString());
        Object.keys(newData).forEach((key) => {
            expect(updatedCar[key]).toEqual(newData[key]);
        });
    });
});
