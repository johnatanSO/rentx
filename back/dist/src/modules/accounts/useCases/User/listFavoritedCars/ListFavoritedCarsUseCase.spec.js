"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MockUsersRepository_1 = require("../../../repositories/in-memory/MockUsersRepository");
const ListFavoritedCarsUseCase_1 = require("./ListFavoritedCarsUseCase");
let mockUsersRepository;
let listFavoritedCarsUseCase;
describe('List favorited cars', () => {
    beforeEach(() => {
        mockUsersRepository = new MockUsersRepository_1.MockUsersRepository();
        listFavoritedCarsUseCase = new ListFavoritedCarsUseCase_1.ListFavoritedCarsUseCase(mockUsersRepository);
    });
    it('should be able list favorited cars', async () => {
        const user = await mockUsersRepository.create({
            email: 'test@test.com',
            name: 'test',
            password: '123456',
            driverLicense: '0000',
        });
        const carId = new mongoose_1.Types.ObjectId();
        const userId = user._id.toString();
        await mockUsersRepository.addCarToFavorite(carId.toString(), userId);
        const favoritedCars = await listFavoritedCarsUseCase.execute(userId);
        expect(favoritedCars).toContainEqual(carId);
    });
});
