"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DayjsDateProvider_1 = require("../../../../../shared/container/providers/DateProvider/DayjsDateProvider");
const MockMailProvider_1 = require("../../../../../shared/container/providers/MailProvider/MockMailProvider");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockUsersRepository_1 = require("../../../repositories/in-memory/MockUsersRepository");
const MockUsersTokensRepository_1 = require("../../../repositories/in-memory/MockUsersTokensRepository");
const SendForgotPasswordMailUseCase_1 = require("./SendForgotPasswordMailUseCase");
let mockUsersRepository;
let mockUsersTokensRepository;
let dateProvider;
let mailProvider;
let sendForgotPasswordMailUseCase;
describe('Send forgot mail', () => {
    beforeEach(() => {
        mockUsersRepository = new MockUsersRepository_1.MockUsersRepository();
        mockUsersTokensRepository = new MockUsersTokensRepository_1.MockUsersTokensRepository();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        mailProvider = new MockMailProvider_1.MockMailProvider();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase(mockUsersRepository, mockUsersTokensRepository, dateProvider, mailProvider);
    });
    it('Should be able to send forgot password mail to user', async () => {
        const sendMail = jest.spyOn(mailProvider, 'sendMail');
        const user = await mockUsersRepository.create({
            email: 'john@john.com',
            name: 'john',
            driverLicense: '123456',
            password: '123456',
            isAdmin: false,
        });
        await sendForgotPasswordMailUseCase.execute(user.email);
        expect(sendMail).toHaveBeenCalled();
    });
    it('Should not be able to send an mail if user not exists', async () => {
        await expect(sendForgotPasswordMailUseCase.execute('unexistsUser@mail.com')).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able to create an users token', async () => {
        const tokenMail = jest.spyOn(mockUsersTokensRepository, 'create');
        const user = await mockUsersRepository.create({
            email: 'john@john.com',
            name: 'john',
            driverLicense: '123456',
            password: '123456',
            isAdmin: false,
        });
        await sendForgotPasswordMailUseCase.execute(user.email);
        expect(tokenMail).toBeCalled();
    });
});
