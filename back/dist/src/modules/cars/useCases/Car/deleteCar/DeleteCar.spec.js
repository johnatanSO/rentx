"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockCarsRepository_1 = require("../../../repositories/Cars/MockCarsRepository");
const DeleteCarUseCase_1 = require("./DeleteCarUseCase");
let mockCarsRepository;
let deleteCarUseCase;
describe('Delete car', () => {
    beforeEach(() => {
        mockCarsRepository = new MockCarsRepository_1.MockCarsRepository();
        deleteCarUseCase = new DeleteCarUseCase_1.DeleteCarUseCase(mockCarsRepository);
    });
    it('should not be able delete car if carId not sent', async () => {
        await expect(async () => {
            await deleteCarUseCase.execute(null);
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able delete car ', async () => {
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
        await deleteCarUseCase.execute(car._id.toString());
        const undefiendCar = await mockCarsRepository.findById(car._id.toString());
        expect(undefiendCar).toBeUndefined();
    });
});
