"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockSpecificationsRepository_1 = require("../../../repositories/Specifitacions/MockSpecificationsRepository");
const DeleteSpecificationUseCase_1 = require("./DeleteSpecificationUseCase");
let mockSpecificationsRepository;
let deleteSpecificationUseCase;
describe('Delete specification', () => {
    beforeEach(() => {
        mockSpecificationsRepository = new MockSpecificationsRepository_1.MockSpecificationsRepository();
        deleteSpecificationUseCase = new DeleteSpecificationUseCase_1.DeleteSpecificationUseCase(mockSpecificationsRepository);
    });
    it('should not be able delete specification if specificationId not sent', async () => {
        await expect(deleteSpecificationUseCase.execute(null)).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able delete specification ', async () => {
        const specification = await mockSpecificationsRepository.create({
            name: 'test',
            description: 'test',
        });
        await deleteSpecificationUseCase.execute(specification._id.toString());
        const undefinedSpecification = await mockSpecificationsRepository.findById(specification._id.toString());
        expect(undefinedSpecification).toBeUndefined();
    });
});
