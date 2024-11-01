"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockMailProvider_1 = require("../../../../../shared/container/providers/MailProvider/MockMailProvider");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockUsersRepository_1 = require("../../../repositories/in-memory/MockUsersRepository");
const SendContactUseCase_1 = require("./SendContactUseCase");
let mockUsersRepository;
let mailProvider;
let sendContactUseCase;
describe('Send contact', () => {
    beforeEach(() => {
        mockUsersRepository = new MockUsersRepository_1.MockUsersRepository();
        mailProvider = new MockMailProvider_1.MockMailProvider();
        sendContactUseCase = new SendContactUseCase_1.SendContactUseCase(mockUsersRepository, mailProvider);
    });
    it('should not be able send contact if e-mail not sent', async () => {
        await expect(async () => {
            await sendContactUseCase.execute({
                email: null,
                message: 'Test message',
                name: 'John',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able send contact if message not sent', async () => {
        await expect(async () => {
            await sendContactUseCase.execute({
                email: 'teste@teste.com',
                message: null,
                name: 'John',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able send contact', async () => {
        const contact = jest.spyOn(mailProvider, 'sendMail');
        await sendContactUseCase.execute({
            email: 'teste@teste.com',
            message: 'Mensagem de teste',
            name: 'John',
        });
        expect(contact).toHaveBeenCalled();
    });
});
