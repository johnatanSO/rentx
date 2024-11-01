"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockCategoriesRepository_1 = require("../../../repositories/Categories/MockCategoriesRepository");
const UpdateCategoryUseCase_1 = require("./UpdateCategoryUseCase");
let mockCategoriesRepository;
let updateCategoryUseCase;
describe('Update category', () => {
    beforeEach(() => {
        mockCategoriesRepository = new MockCategoriesRepository_1.MockCategoriesRepository();
        updateCategoryUseCase = new UpdateCategoryUseCase_1.UpdateCategoryUseCase(mockCategoriesRepository);
    });
    it('should not be able update category infos if categoryId not sent', async () => {
        await expect(updateCategoryUseCase.execute({
            categoryId: null,
            description: 'teste',
            name: 'teste',
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able update category infos if categoryId id invalid', async () => {
        await expect(updateCategoryUseCase.execute({
            categoryId: new mongoose_1.Types.ObjectId().toString(),
            description: 'teste',
            name: 'teste',
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able update category infos ', async () => {
        const category = await mockCategoriesRepository.create({
            name: 'test',
            description: 'test',
        });
        const newData = {
            name: 'new name',
            description: 'new description',
        };
        await updateCategoryUseCase.execute({
            categoryId: category._id.toString(),
            ...newData,
        });
        const updatedCategory = await mockCategoriesRepository.findById(category._id.toString());
        expect(updatedCategory.name).toBe(newData.name);
        expect(updatedCategory.description).toBe(newData.description);
    });
});
