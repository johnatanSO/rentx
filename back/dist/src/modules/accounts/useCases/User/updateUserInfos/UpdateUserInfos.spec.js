"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockUsersRepository_1 = require("../../../repositories/in-memory/MockUsersRepository");
const UpdateUserInfosUseCase_1 = require("./UpdateUserInfosUseCase");
let mockUsersRepository;
let updateUserInfosUserCase;
describe('Update user infos', () => {
    beforeEach(() => {
        mockUsersRepository = new MockUsersRepository_1.MockUsersRepository();
        updateUserInfosUserCase = new UpdateUserInfosUseCase_1.UpdateUserInfosUseCase(mockUsersRepository);
    });
    it('should not be able update user infos if idUser not sent', async () => {
        await expect(async () => {
            await updateUserInfosUserCase.execute({
                email: 'teste@teste.com',
                isAdmin: false,
                name: 'teste',
                userId: null,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able update user infos', async () => {
        const user = await mockUsersRepository.create({
            driverLicense: '123',
            email: 'teste@teste.com',
            name: 'teste',
            password: '123',
            isAdmin: false,
        });
        const newEmail = 'novo_email@teste.com';
        const updatedUser = await updateUserInfosUserCase.execute({
            email: newEmail,
            isAdmin: false,
            name: 'teste',
            userId: user._id.toString(),
        });
        expect(updatedUser.email).toBe(newEmail);
    });
});
