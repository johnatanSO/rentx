"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MockRentalsRepository_1 = require("../../repositories/in-memory/MockRentalsRepository");
const ListRentalsUseCase_1 = require("./ListRentalsUseCase");
const dayjs_1 = __importDefault(require("dayjs"));
const AppError_1 = require("../../../../shared/errors/AppError");
let mockRentalsRepository;
let listRentalsUseCase;
describe('List rentals', () => {
    beforeEach(() => {
        mockRentalsRepository = new MockRentalsRepository_1.MockRentalsRepository();
        listRentalsUseCase = new ListRentalsUseCase_1.ListRentalsUseCase(mockRentalsRepository);
    });
    it('Should be able list rentals', async () => {
        const userId = new mongoose_1.Types.ObjectId().toString();
        const carId = new mongoose_1.Types.ObjectId().toString();
        const expectedReturnDate = (0, dayjs_1.default)().add(2, 'days').toDate();
        const newRental = await mockRentalsRepository.create({
            carId,
            userId,
            expectedReturnDate,
        });
        const rentals = await listRentalsUseCase.execute(userId);
        expect(rentals).toHaveLength(1);
        expect(rentals).toContain(newRental);
    });
    it('Should not be able list rentals if idUser not sent', async () => {
        await expect(listRentalsUseCase.execute(null)).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
