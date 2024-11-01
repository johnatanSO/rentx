"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const DayjsDateProvider_1 = require("../../../../../shared/container/providers/DateProvider/DayjsDateProvider");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockUsersTokensRepository_1 = require("../../../repositories/in-memory/MockUsersTokensRepository");
const RefreshTokenUseCase_1 = require("./RefreshTokenUseCase");
const auth_1 = __importDefault(require("../../../../../config/auth"));
const dayjs_1 = __importDefault(require("dayjs"));
const mongoose_1 = require("mongoose");
let mockUsersTokensRepository;
let dateProvider;
let refreshTokenUseCase;
describe('Refresh token', () => {
    beforeEach(() => {
        mockUsersTokensRepository = new MockUsersTokensRepository_1.MockUsersTokensRepository();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        refreshTokenUseCase = new RefreshTokenUseCase_1.RefreshTokenUseCase(mockUsersTokensRepository, dateProvider);
    });
    it('should not be able refresh token if token not sent', async () => {
        await expect(refreshTokenUseCase.execute(null)).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able refresh token if user token inválid', async () => {
        await expect(async () => {
            const refreshToken = (0, jsonwebtoken_1.sign)({ email: 'teste@teste.com' }, auth_1.default.secretRefreshToken, {
                subject: '123',
                expiresIn: auth_1.default.expiresInRefreshToken,
            });
            await refreshTokenUseCase.execute(refreshToken);
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able refresh token', async () => {
        const userId = new mongoose_1.Types.ObjectId();
        const oldToken = (0, jsonwebtoken_1.sign)({ email: 'teste@teste.com' }, auth_1.default.secretRefreshToken, {
            subject: userId.toString(),
            expiresIn: auth_1.default.expiresInRefreshToken,
        });
        await mockUsersTokensRepository.create({
            expiresDate: (0, dayjs_1.default)().add(5, 'days').toDate(),
            refreshToken: oldToken,
            user: userId.toString(),
        });
        const { refreshToken, newToken } = await refreshTokenUseCase.execute(oldToken);
        expect(refreshToken).not.toBeUndefined();
        expect(newToken).not.toBeUndefined();
    });
});
