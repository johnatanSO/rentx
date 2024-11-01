"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockUsersRepository_1 = require("../../../repositories/in-memory/MockUsersRepository");
const ListAllUsersUseCase_1 = require("./ListAllUsersUseCase");
let mockUserSRepository;
let listAllUsersUseCase;
describe('List all users', () => {
    beforeEach(() => {
        mockUserSRepository = new MockUsersRepository_1.MockUsersRepository();
        listAllUsersUseCase = new ListAllUsersUseCase_1.ListAllUsersUseCase(mockUserSRepository);
    });
    it('should be able list all users', async () => {
        const user = await mockUserSRepository.create({
            email: 'test@test.com',
            name: 'test',
            password: '123456',
            driverLicense: '0000',
        });
        const users = await listAllUsersUseCase.execute();
        expect(users).toContain(user);
    });
});
