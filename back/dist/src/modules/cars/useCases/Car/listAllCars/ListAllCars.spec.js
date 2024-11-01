"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MockCarsRepository_1 = require("../../../repositories/Cars/MockCarsRepository");
const ListAllCarsUseCase_1 = require("./ListAllCarsUseCase");
let mockCarsRepository;
let listAllCarsUseCase;
describe('List all cars', () => {
    beforeEach(() => {
        mockCarsRepository = new MockCarsRepository_1.MockCarsRepository();
        listAllCarsUseCase = new ListAllCarsUseCase_1.ListAllCarsUseCase(mockCarsRepository);
    });
    it('should be able list all cars', async () => {
        await mockCarsRepository.create({
            brand: 'teste',
            categoryId: new mongoose_1.Types.ObjectId().toString(),
            dailyRate: 100,
            description: 'teste',
            fineAmount: 100,
            licensePlate: 'teste',
            name: 'teste',
            transmission: 'teste',
        });
        const allCars = await listAllCarsUseCase.execute();
        expect(allCars.length).toBeGreaterThan(0);
    });
});
