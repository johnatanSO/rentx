"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockCategoriesRepository_1 = require("../../../repositories/Categories/MockCategoriesRepository");
const DeleteCategoryUseCase_1 = require("./DeleteCategoryUseCase");
let mockCategoriesRepository;
let deleteCategoryUseCase;
describe('Delete category', () => {
    beforeEach(() => {
        mockCategoriesRepository = new MockCategoriesRepository_1.MockCategoriesRepository();
        deleteCategoryUseCase = new DeleteCategoryUseCase_1.DeleteCategoryUseCase(mockCategoriesRepository);
    });
    it('should not be able delete category if categoryId not sent', async () => {
        await expect(deleteCategoryUseCase.execute(null)).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should be able delete category ', async () => {
        const category = await mockCategoriesRepository.create({
            name: 'test',
            description: 'test',
        });
        await deleteCategoryUseCase.execute(category._id.toString());
        const undefinedCaregory = await mockCategoriesRepository.findById(category._id.toString());
        expect(undefinedCaregory).toBeUndefined();
    });
});
