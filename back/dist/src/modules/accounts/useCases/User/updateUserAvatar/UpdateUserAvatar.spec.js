"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockStorageProvider_1 = require("../../../../../shared/container/providers/StorageProvider/MockStorageProvider");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockUsersRepository_1 = require("../../../repositories/in-memory/MockUsersRepository");
const UpdateUserAvatarUseCase_1 = require("./UpdateUserAvatarUseCase");
let mockUsersRepository;
let storageProvider;
let updateUserAvatarUseCase;
describe('Update user avatar', () => {
    beforeEach(() => {
        mockUsersRepository = new MockUsersRepository_1.MockUsersRepository();
        storageProvider = new MockStorageProvider_1.MockStorageProvider();
        updateUserAvatarUseCase = new UpdateUserAvatarUseCase_1.UpdateUserAvatarUseCase(mockUsersRepository, storageProvider);
    });
    it('should not be able update user avatar if image not sent', async () => {
        await expect(async () => {
            await updateUserAvatarUseCase.execute({
                avatarImage: null,
                userId: '123',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able update user avatar if idUser not sent', async () => {
        await expect(async () => {
            await updateUserAvatarUseCase.execute({
                userId: null,
                avatarImage: 'image_test',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able update user avatar if idUser invalid', async () => {
        await expect(async () => {
            await updateUserAvatarUseCase.execute({
                userId: '777',
                avatarImage: 'image_test',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able delete image if user already have avatar', async () => {
        const user = await mockUsersRepository.create({
            email: 'teste@teste.com',
            name: 'teste',
            driverLicense: '123',
            password: '123',
            isAdmin: false,
        });
        await mockUsersRepository.update({ _id: user._id.toString() }, {
            $set: {
                avatar: 'appspot.com/image_name',
            },
        });
        const updatedUser = await updateUserAvatarUseCase.execute({
            userId: user._id.toString(),
            avatarImage: 'image_test',
        });
        expect(updatedUser.avatar).not.toEqual('appspot.com/image_name');
    });
    it('should be able update user avatar', async () => {
        const user = await mockUsersRepository.create({
            email: 'teste@teste.com',
            name: 'teste',
            driverLicense: '123',
            password: '123',
            isAdmin: false,
        });
        const updatedUser = await updateUserAvatarUseCase.execute({
            userId: user._id.toString(),
            avatarImage: 'image_test',
        });
        expect(updatedUser.avatar).not.toBeNull();
    });
});
