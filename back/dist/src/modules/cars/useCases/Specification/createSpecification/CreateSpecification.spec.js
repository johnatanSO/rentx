"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockSpecificationsRepository_1 = require("../../../repositories/Specifitacions/MockSpecificationsRepository");
const CreateSpecificationUseCase_1 = require("./CreateSpecificationUseCase");
let mockSpecificationsRepository;
let createSpecificationUseCase;
describe('Create specification', () => {
    beforeEach(() => {
        mockSpecificationsRepository = new MockSpecificationsRepository_1.MockSpecificationsRepository();
        createSpecificationUseCase = new CreateSpecificationUseCase_1.CreateSpecificationUseCase(mockSpecificationsRepository);
    });
    it('should not be able create specification with same name', async () => {
        await expect(async () => {
            await mockSpecificationsRepository.create({
                name: 'same name',
                description: 'first specification',
            });
            await createSpecificationUseCase.execute({
                name: 'same name',
                description: 'second specification',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able create specification', async () => {
        const specification = await createSpecificationUseCase.execute({
            name: 'same name',
            description: 'second specification',
        });
        expect(specification).toHaveProperty('_id');
    });
});
