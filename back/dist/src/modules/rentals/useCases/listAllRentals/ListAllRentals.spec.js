"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MockRentalsRepository_1 = require("../../repositories/in-memory/MockRentalsRepository");
const ListAllRentalsUseCase_1 = require("./ListAllRentalsUseCase");
const dayjs_1 = __importDefault(require("dayjs"));
let mockRentalsRepository;
let listAllRentalsUseCase;
describe('List all rentals', () => {
    beforeEach(() => {
        mockRentalsRepository = new MockRentalsRepository_1.MockRentalsRepository();
        listAllRentalsUseCase = new ListAllRentalsUseCase_1.ListAllRentalsUseCase(mockRentalsRepository);
    });
    it('Should be able list all rentals', async () => {
        await mockRentalsRepository.create({
            carId: new mongoose_1.Types.ObjectId().toString(),
            expectedReturnDate: (0, dayjs_1.default)().add(1, 'day').toDate(),
            userId: new mongoose_1.Types.ObjectId().toString(),
        });
        const carId = null;
        const userId = null;
        const filterStartDate = (0, dayjs_1.default)().startOf('month').toISOString();
        const filterEndDate = (0, dayjs_1.default)().endOf('month').toISOString();
        const allRentals = await listAllRentalsUseCase.execute({
            carId,
            userId,
            filterEndDate,
            filterStartDate,
        });
        expect(allRentals.length).toBeGreaterThan(0);
    });
});
