"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DayjsDateProvider_1 = require("../../../../../shared/container/providers/DateProvider/DayjsDateProvider");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockUsersRepository_1 = require("../../../repositories/in-memory/MockUsersRepository");
const MockUsersTokensRepository_1 = require("../../../repositories/in-memory/MockUsersTokensRepository");
const ResetPasswordUserUseCase_1 = require("./ResetPasswordUserUseCase");
const dayjs_1 = __importDefault(require("dayjs"));
const uuid_1 = require("uuid");
let mockUsersTokensRepository;
let mockUsersRepository;
let dateProvider;
let resetPasswordUserUseCase;
describe('Reset password', () => {
    beforeEach(() => {
        mockUsersTokensRepository = new MockUsersTokensRepository_1.MockUsersTokensRepository();
        mockUsersRepository = new MockUsersRepository_1.MockUsersRepository();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        resetPasswordUserUseCase = new ResetPasswordUserUseCase_1.ResetPasswordUserUseCase(mockUsersTokensRepository, mockUsersRepository, dateProvider);
    });
    it('should not be able reset password if refreshToken not sent', async () => {
        await expect(resetPasswordUserUseCase.execute({
            refreshToken: null,
            password: '123',
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able reset password if refreshToken not sent', async () => {
        await expect(resetPasswordUserUseCase.execute({
            refreshToken: 'invalid_token',
            password: '123',
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able reset password if refreshToken is expired', async () => {
        await expect(async () => {
            const userId = new mongoose_1.Types.ObjectId();
            const token = await mockUsersTokensRepository.create({
                user: userId.toString(),
                refreshToken: '123',
                expiresDate: (0, dayjs_1.default)().subtract(5, 'day').toDate(),
            });
            await resetPasswordUserUseCase.execute({
                password: '123',
                refreshToken: token.refreshToken,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able reset password', async () => {
        const user = await mockUsersRepository.create({
            name: 'teste',
            email: 'teste@teste.com',
            password: '123456',
            driverLicense: '111',
            isAdmin: false,
        });
        const token = await mockUsersTokensRepository.create({
            user: user._id.toString(),
            refreshToken: (0, uuid_1.v4)(),
            expiresDate: (0, dayjs_1.default)().add(5, 'day').toDate(),
        });
        await resetPasswordUserUseCase.execute({
            password: '123',
            refreshToken: token.refreshToken,
        });
    });
});
