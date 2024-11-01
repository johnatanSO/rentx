"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockSpecificationsRepository_1 = require("../../../repositories/Specifitacions/MockSpecificationsRepository");
const UpdateSpecificationUseCase_1 = require("./UpdateSpecificationUseCase");
let mockSpecificationsRepository;
let updateSpecificationUseCase;
describe('Update specification', () => {
    beforeEach(() => {
        mockSpecificationsRepository = new MockSpecificationsRepository_1.MockSpecificationsRepository();
        updateSpecificationUseCase = new UpdateSpecificationUseCase_1.UpdateSpecificationUseCase(mockSpecificationsRepository);
    });
    it('should not be able update specification if idSpecification not sent', async () => {
        await expect(updateSpecificationUseCase.execute({
            description: 'teste',
            name: 'teste',
            specificationId: null,
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able update specification if idSpecification inválid', async () => {
        await expect(updateSpecificationUseCase.execute({
            description: 'teste',
            name: 'teste',
            specificationId: new mongoose_1.Types.ObjectId().toString(),
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able update specification', async () => {
        const specification = await mockSpecificationsRepository.create({
            name: 'teste',
            description: 'teste',
        });
        const newData = {
            name: 'new name',
            description: 'new description',
        };
        await updateSpecificationUseCase.execute({
            ...newData,
            specificationId: specification._id.toString(),
        });
        const updatedSpecification = await mockSpecificationsRepository.findById(specification._id.toString());
        expect(updatedSpecification.name).toBe(newData.name);
        expect(updatedSpecification.description).toBe(newData.description);
    });
});
