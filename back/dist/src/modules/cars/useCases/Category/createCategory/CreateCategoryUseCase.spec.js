"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const AppError_1 = require("../../../../../shared/errors/AppError");
const MockCategoriesRepository_1 = require("../../../repositories/Categories/MockCategoriesRepository");
const CreateCategoryUseCase_1 = require("./CreateCategoryUseCase");
let createCategoryUseCase;
let mockCategoriesRepository;
describe('Create category ', () => {
    beforeEach(() => {
        mockCategoriesRepository = new MockCategoriesRepository_1.MockCategoriesRepository();
        createCategoryUseCase = new CreateCategoryUseCase_1.CreateCategoryUseCase(mockCategoriesRepository);
    });
    it('should be able to create a new category', async () => {
        const newCategory = await createCategoryUseCase.execute({
            name: 'Teste jest',
            description: 'Teste de implementação jest',
        });
        expect(newCategory).toHaveProperty('_id');
    });
    it('should not be able to create a new category with name exists', async () => {
        await expect(async () => {
            await createCategoryUseCase.execute({
                name: 'Teste jest',
                description: 'Categoria com o mesmo nome',
            });
            await createCategoryUseCase.execute({
                name: 'Teste jest',
                description: 'Categoria com o mesmo nome',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
