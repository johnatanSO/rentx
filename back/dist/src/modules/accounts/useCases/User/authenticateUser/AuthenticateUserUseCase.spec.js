"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockUsersRepository_1 = require("../../../repositories/in-memory/MockUsersRepository");
const CreateNewUserUseCase_1 = require("../createNewUser/CreateNewUserUseCase");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
const MockUsersTokensRepository_1 = require("../../../repositories/in-memory/MockUsersTokensRepository");
const DayjsDateProvider_1 = require("../../../../../shared/container/providers/DateProvider/DayjsDateProvider");
let mockUsersRepository;
let mockUsersTokensRepository;
let dateProvider;
let authenticateUserUseCase;
let createNewUserUseCase;
describe('Autenticação do usuário', () => {
    beforeEach(() => {
        mockUsersRepository = new MockUsersRepository_1.MockUsersRepository();
        mockUsersTokensRepository = new MockUsersTokensRepository_1.MockUsersTokensRepository();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(mockUsersRepository, mockUsersTokensRepository, dateProvider);
        createNewUserUseCase = new CreateNewUserUseCase_1.CreateNewUserUseCase(mockUsersRepository);
    });
    it('Should be able to authenticate a user', async () => {
        const user = {
            email: 'user@test.com',
            password: '123456',
            confirmPassword: '123456',
            driverLicense: '000123',
            name: 'User Test',
        };
        await createNewUserUseCase.execute(user);
        const authInfos = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(authInfos).toHaveProperty('token');
    });
    it('Should not be able to authenticate an none existent user', async () => {
        await expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'reject@gmail.com',
                password: null,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('Should not be able to authenticate a incorrect password', async () => {
        await expect(async () => {
            const user = await mockUsersRepository.create({
                email: 'user@test.com',
                password: '123456',
                driverLicense: '000123',
                name: 'User Test',
            });
            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrect password',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
