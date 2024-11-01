"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockCarsRepository_1 = require("../../../repositories/Cars/MockCarsRepository");
const GetCarInfoUseCase_1 = require("./GetCarInfoUseCase");
let mockCarsRepository;
let getCarInfoUseCase;
describe('Get car info', () => {
    beforeEach(() => {
        mockCarsRepository = new MockCarsRepository_1.MockCarsRepository();
        getCarInfoUseCase = new GetCarInfoUseCase_1.GetCarInfoUseCase(mockCarsRepository);
    });
    it('should not be able get car infos if carId not sent', async () => {
        await expect(getCarInfoUseCase.execute(null)).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able get car infos', async () => {
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
        const carInfo = await getCarInfoUseCase.execute(car._id.toString());
        expect(carInfo).not.toBeUndefined();
    });
});
