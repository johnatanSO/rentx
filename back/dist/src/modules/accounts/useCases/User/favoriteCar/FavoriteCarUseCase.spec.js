"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MockUsersRepository_1 = require("../../../repositories/in-memory/MockUsersRepository");
const FavoriteCarUseCase_1 = require("./FavoriteCarUseCase");
const AppError_1 = require("../../../../../shared/errors/AppError");
let mockUsersRepository;
let favoriteCarUseCase;
describe('Favorite car', () => {
    beforeEach(() => {
        mockUsersRepository = new MockUsersRepository_1.MockUsersRepository();
        favoriteCarUseCase = new FavoriteCarUseCase_1.FavoriteCarUseCase(mockUsersRepository);
    });
    it('Should be able favorite a car', async () => {
        const carId = new mongoose_1.Types.ObjectId();
        const user = await mockUsersRepository.create({
            email: 'test@test.com',
            name: 'test',
            password: '123456',
            driverLicense: '0000',
        });
        const userId = user._id.toString();
        const updatedUser = await favoriteCarUseCase.execute({
            carId: carId.toString(),
            userId,
        });
        expect(updatedUser.favoriteCars).toContainEqual(carId);
    });
    it('Should be able remove car from favorites', async () => {
        const carId = new mongoose_1.Types.ObjectId();
        const user = await mockUsersRepository.create({
            email: 'test@test.com',
            name: 'test',
            password: '123456',
            driverLicense: '0000',
        });
        const userId = user._id.toString();
        await mockUsersRepository.addCarToFavorite(carId.toString(), userId);
        const updatedUser = await favoriteCarUseCase.execute({
            carId: carId.toString(),
            userId,
        });
        expect(updatedUser.favoriteCars).not.toContainEqual(carId);
    });
    it('should no be able favorite car if carId not sent', async () => {
        await expect(async () => {
            await favoriteCarUseCase.execute({
                userId: new mongoose_1.Types.ObjectId().toString(),
                carId: null,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
