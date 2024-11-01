"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../../../shared/errors/AppError");
const MockRentalsRepository_1 = require("../../repositories/in-memory/MockRentalsRepository");
const CreateRentalUseCase_1 = require("./CreateRentalUseCase");
const dayjs_1 = __importDefault(require("dayjs"));
const DayjsDateProvider_1 = require("../../../../shared/container/providers/DateProvider/DayjsDateProvider");
const MockCarsRepository_1 = require("../../../cars/repositories/Cars/MockCarsRepository");
let mockRentalsRepository;
let createRentalUseCase;
let dayjsDateProvider;
let mockCarsRepository;
describe('Create rental', () => {
    beforeEach(() => {
        mockRentalsRepository = new MockRentalsRepository_1.MockRentalsRepository();
        dayjsDateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        mockCarsRepository = new MockCarsRepository_1.MockCarsRepository();
        createRentalUseCase = new CreateRentalUseCase_1.CreateRentalUseCase(mockRentalsRepository, dayjsDateProvider, mockCarsRepository);
    });
    it('should be able create new rental', async () => {
        const newRental = await createRentalUseCase.execute({
            carId: '651b727ed2378291ec65392e',
            userId: '650cf6518adcd3da7764f338',
            expectedReturnDate: (0, dayjs_1.default)().add(1, 'day').toDate(),
        });
        expect(newRental).toHaveProperty('_id');
        expect(newRental).toHaveProperty('startDate');
    });
    it('should not be able to create new rental if there is another open to the same user', async () => {
        await expect(async () => {
            const fakeCarId1 = new mongoose_1.Types.ObjectId();
            const fakeCarId2 = new mongoose_1.Types.ObjectId();
            const fakeUserId = new mongoose_1.Types.ObjectId();
            await createRentalUseCase.execute({
                carId: fakeCarId1.toString(),
                userId: fakeUserId.toString(),
                expectedReturnDate: (0, dayjs_1.default)().add(1, 'day').toDate(),
            });
            await createRentalUseCase.execute({
                carId: fakeCarId2.toString(),
                userId: fakeUserId.toString(),
                expectedReturnDate: (0, dayjs_1.default)().add(1, 'day').toDate(),
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able to create new rental if there is another open to the same car', async () => {
        await expect(async () => {
            const fakeUserId1 = new mongoose_1.Types.ObjectId();
            const fakeUserId2 = new mongoose_1.Types.ObjectId();
            const fakeCarId = new mongoose_1.Types.ObjectId();
            await createRentalUseCase.execute({
                carId: fakeCarId.toString(),
                userId: fakeUserId1.toString(),
                expectedReturnDate: (0, dayjs_1.default)().add(1, 'day').toDate(),
            });
            await createRentalUseCase.execute({
                carId: fakeCarId.toString(),
                userId: fakeUserId2.toString(),
                expectedReturnDate: (0, dayjs_1.default)().add(1, 'day').toDate(),
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    // it('should not be able to create new rental if expected return date less than 24 hours', async () => {
    //   await expect(async () => {
    //     const fakeUserId = new Types.ObjectId()
    //     const fakeCarId = new Types.ObjectId()
    //     await createRentalUseCase.execute({
    //       carId: fakeCarId.toString(),
    //       userId: fakeUserId.toString(),
    //       expectedReturnDate: dayjs().utc().add(5, 'hours').toDate(),
    //     })
    //   }).rejects.toBeInstanceOf(AppError)
    // })
});
