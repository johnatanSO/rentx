"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockSpecificationsRepository_1 = require("../../../repositories/Specifitacions/MockSpecificationsRepository");
const ListSpecificationsUseCase_1 = require("./ListSpecificationsUseCase");
let listSpecificationsUseCase;
let mockSpecificationsRepository;
describe('List specifications', () => {
    beforeEach(() => {
        mockSpecificationsRepository = new MockSpecificationsRepository_1.MockSpecificationsRepository();
        listSpecificationsUseCase = new ListSpecificationsUseCase_1.ListSpecificationsUseCase(mockSpecificationsRepository);
    });
    it('should be able list specifications', async () => {
        await mockSpecificationsRepository.create({
            name: 'Specification name',
            description: 'Specification description',
        });
        const specifications = await listSpecificationsUseCase.execute();
        expect(specifications.length).toBeGreaterThan(0);
    });
});
